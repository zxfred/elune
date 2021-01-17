function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = (key) => key.startsWith("on"); // 判断是否是 event listener
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

// 更新 dom
function updateDom(dom, prevProps, nextProps) {
  // 删除 old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork); // 执行删除
  commitWork(wipRoot.child); // 更新 dom
  currentRoot = wipRoot; // 保存上一个 root
  wipRoot = null; // 清空
}

// 给每个 fiber 的 parent, child, sibling 更新 dom
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // go up the fiber tree until we find a fiber with a DOM node.
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

// when removing a node we also need to keep going until we find a child with a DOM node.
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
  // set next unit of work
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  // 没有下一个任务, 即所有任务完成的时候, 更新整个 fiber tree 到 dom
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 准备每个 unit 的任务
function performUnitOfWork(fiber) {
  // 判断 fiber.type 是不是 function
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent; // 向上查找直到 parent 为空
  }
}

// 更新 function component
let wipFiber = null;
let hookIndex = null;
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0; // keep track of the current hook index
  wipFiber.hooks = []; // to support calling useState several times in the same component
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  // check if we have an old hook
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

// 更新 dom component
function updateHostComponent(fiber) {
  // add dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // create new fibers
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  // TODO why
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  console.log(oldFiber);
  let prevSibling = null; // 指针, 保存着前一个兄弟fiber

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];

    // 比较 oldFiber 和当前 fiber
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    // 如果 type 一样, 保存 dom, 更新 props
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    // 如果 type 不一样, 有新的 element, 需要创建一个新的 dom
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    // 如果 type 不一样, 存在 oldFiber, 移除 oldFiber
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    // Here React also uses keys,
    // that makes a better reconciliation.
    // For example, it detects when children change places in the element array.

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber; // 从第 2 个 fiber 开始时, 关联前面的 fiber 为 sibling
    }

    prevSibling = newFiber; // 保存第一个 fiber
    index++;
  }
}

const Didact = {
  createElement,
  render,
  useState,
};

// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   Didact.createElement(
//     "h1",
//     null,
//     Didact.createElement("p", null, "p"),
//     Didact.createElement("a", null, "a")
//   ),
//   Didact.createElement("h2", null, "h2")
// );

const container = document.getElementById("root");

// const updateValue = (e) => {
//   rerender(e.target.value);
// };

// const rerender = (value) => {
//   const element = Didact.createElement(
//     "div",
//     { id: "foo" },
//     Didact.createElement("input", { onInput: updateValue }),
//     Didact.createElement("h2", null, `Hello ${value}`)
//   );
//   Didact.render(element, container);
// };

// rerender("world");

function Counter() {
  const [state, setState] = Didact.useState(1);
  return Didact.createElement(
    "h1",
    { onClick: () => setState((c) => c + 1) },
    `Count: ${state}`
  );
}

const element = Counter();

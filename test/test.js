var a = {};

a.f = () => {
  console.log(this);
};

a.f.call(this);
a.f();
a.f.call(a);

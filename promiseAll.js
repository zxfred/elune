function all(promises) {
  const values = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          values[index] = value;
          if (values.length == promises.length) {
            resolve(values);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}

// 引入我们的 MyPromise.js
const MyPromise = require("./MyPromise");
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

promise.then(
  (value) => {
    console.log("resolve", value);
  },
  (reason) => {
    console.log("reject", reason);
  }
);

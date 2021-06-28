# `promise`

## 简单的`promise`实现

```js
// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class PromiseA {
  status = PENDING;
  val;
  onFulfilledCallback = [];
  onRejectedCallback = [];
  reason;
  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  resolve = (val) => {
    this.status = FULFILLED;
    this.val = val;
    whi;
    this.onFulfilledCallback.push(val);
  };
  reject(reason) {
    this.status = REJECTED;
    this.reason = reason;
    this.onRejectedCallback.push(reason);
  }
  then(success, fail) {
    if (this.status === FULFILLED) {
      success(this.val);
    } else if (this.status === REJECTED) {
      fail(this.reason);
    } else {
      this.onFulfilledCallbacks.push(success);
      this.onRejectedCallbacks.push(fail);
    }
    return this;
  }
  catch(fn) {}
}

new PromiseA((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then((res) => {
  console.log(res);
});
```

<https://juejin.cn/post/6945319439772434469>

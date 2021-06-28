const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  status = PENDING;
  value;
  reason;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  resolve = (value) => {
    this.status = FULFILLED;
    this.value = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(value);
    }
  };
  reject = (reason) => {
    this.status = REJECTED;
    this.reason = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason);
    }
  };
  then(success, fail) {
    if (this.status === FULFILLED) {
      success && success(this.value);
    } else if (this.status === REJECTED) {
      fail && fail(this.reason);
    } else {
      success && this.onFulfilledCallbacks.push(success);
      fail && this.onRejectedCallbacks.push(fail);
    }
  }
  catch(fn) {}
}

module.exports = MyPromise;

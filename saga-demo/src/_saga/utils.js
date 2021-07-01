export function sleep(delay, val=true) {
  return new Promise((r, j) =>
    setTimeout(() => {
      r(val)
    }, delay * 1000)
  )
}

function isPromise(o) {
  return typeof o === "function" && typeof o.then === "function"
}

function isEffect(o) {
  return !!o.isEffect
}

function isIterator(fn) {
  return typeof fn === "function" && Object.prototype.toString.call(fn) === "[object Generator]"
}

function isUndef(o) {
  return o === null || o === undefined
}

export const noop = () => {}

export const is = {
  promise: isPromise,
  iterator: isIterator,
  effect: isEffect,
  undef: isUndef,
}

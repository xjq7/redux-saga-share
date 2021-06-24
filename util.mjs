export async function sleep(delay) {
  await new Promise((r, j) =>
    setTimeout(() => {
      r()
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

export const is = {
  promise: isPromise,
  iterator: isIterator,
  effect: isEffect,
}
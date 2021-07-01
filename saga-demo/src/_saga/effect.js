export function take(pattern) {
  return {
    isEffect: true,
    type: "take",
    pattern,
  }
}

export function put(action) {
  return {
    isEffect: true,
    type: "put",
    action,
  }
}

export function call(fn, ...args) {
  return {
    isEffect: true,
    type: "call",
    fn,
    args,
  }
}
 
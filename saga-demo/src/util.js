export function sleep(delay) {
  return new Promise((r, j) =>
    setTimeout(() => {
      r()
    }, delay * 1000)
  )
}


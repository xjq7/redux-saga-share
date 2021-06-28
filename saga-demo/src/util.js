export async function sleep(delay) {
  await new Promise((r, j) =>
    setTimeout(() => {
      r()
    }, delay * 1000)
  )
}


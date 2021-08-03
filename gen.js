function* generator() {
  console.log('start');
  const r1 = yield 1
  console.log(r1,'r1')
  const r2 = yield 2
  console.log(r2)
  const r3 = yield 3
  console.log(r3)
}

const g = generator()

let it
it = g.next()
console.log(it)

it = g.next(3)
console.log(it)

it = g.next(200)
console.log(it)

it = g.next(200)
console.log(it)

// gg = g.next(1)
// console.log(gg)

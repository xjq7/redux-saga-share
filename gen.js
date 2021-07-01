function* generator(){
  const r1 = yield ()=>1;
  console.log(r1);
  const r2 =  yield 2;
  console.log(r2);
  const r3=  yield 3;
  console.log(r3);
}

const g = generator()
let gg
gg=g.next()
console.log(gg.value());

gg=g.next(3)
console.log(gg);

gg=g.next(2)
console.log(gg);

gg=g.next(1)
console.log(gg);
 
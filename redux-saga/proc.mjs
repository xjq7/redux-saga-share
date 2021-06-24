import { is } from "../util.mjs"
import runEffectMap from "./runEffect.mjs"

function runEffectWithNext({ type, ...args }, next, store) {
  runEffectMap[type](args, next, store)
}

export default function proc(iterator) {
  let _store = this
  
  next()
  function next(err, preValue) {
    if (err) iterator.throw(err)
    const it = iterator.next(preValue)
    const { done, value } = it
    if (done) return
    if (is.promise(value)) {
      value.then((success) => next(null, success)).catch((err) => next(err))
    } else if (is.effect(value)) {
      runEffectWithNext(value, next, _store)
    } else {
      next(null, value)
    }
  }
}

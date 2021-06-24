function channel() {
  let _task

  function take(task) {
    _task = task
  }

  function put(type, payload) {
    if (!_task) return
    if (type === _task.pattern){
      _task.cb.call(null, payload)}
  }
  return {
    take,
    put,
  }
}

export default channel()

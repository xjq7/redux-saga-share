function channel() {
  let _task
  function take(task) {
    _task = task
  }

  function put(type, payload) {
    if (_task.pattern === type) {
      _task.cb.call(null, payload)
      _task=null
    }
  }

  return {
    take,
    put,
  }
}

export default channel()

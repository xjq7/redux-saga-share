function channel() {
  let _task
  function take(task) {
    _task = task
  }

  function put(action) {
    if(!_task)return
    if (_task.pattern === action.type) {
      _task.cb.call(null, action)
      _task=null
    }
  }

  return {
    take,
    put,
  }
}

export default channel()

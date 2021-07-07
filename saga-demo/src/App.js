import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Card } from "antd"
import "./App.css"
import { UPDATE_COUNT, ADD_COUNT_AUTO, RESET_BOOK } from "./const/book"
import { GET_USER, RESET_USER } from "./const/user"

function App () {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <div className='center'>
      <div>
        <Button
          onClick={() => {
            dispatch({ type: ADD_COUNT_AUTO })
          }}
          className='mr10'
        >
          auto add count
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: UPDATE_COUNT, payload: { count: 100 } })
          }}
          className='mr10'
        >
          update count 100
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: RESET_BOOK })
          }}
          className='mr10'
        >
          重置book
        </Button>
      </div>
      <div className='mt20'>
        <Button
          onClick={() => {
            dispatch({ type: GET_USER, payload: { name: "xxx" } })
          }}
          className='mr10'
        >
          获取user
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: RESET_USER })
          }}
          className='mr10'
        >
          重置user
        </Button>
      </div>

      <Card title='store' className='mt20'>
        {Object.keys(state).map((key, index) => (
          <p key={index}>
            {key}: {JSON.stringify(state[key])}
          </p>
        ))}
      </Card>
    </div>
  )
}
export default App

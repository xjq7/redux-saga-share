import { useEffect } from "react"
import { getUser, resetUser } from "./action/user"
import { useSelector, useDispatch } from "react-redux"
import { Button, Card } from "antd"
import "./App.css"
import { getBook, resetBook, addBookPage } from "./action/book"
import { ADD_BOOK_PAGE_AUTO } from "./const/book"

function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { bookReducer, userReducer } = state
  const { fetchLoading: bookFetchLoading } = bookReducer
  return (
    <div className='center'>
      <div>
        <Button
          onClick={() => {
            dispatch(getUser({ name: "xxx" }))
          }}
          className='mr10'
        >
          初始化user
        </Button>
        <Button
          onClick={() => {
            dispatch(getBook({ name: "xxx" }))
          }}
          className='mr10'
        >
          初始化book
        </Button>
        <Button
          onClick={() => {
            dispatch(resetBook())
          }}
          className='mr10'
        >
          重置book
        </Button>
        <Button
          onClick={() => {
            dispatch(resetUser())
          }}
          className='mr10'
        >
          重置user
        </Button>
      </div>
      <div className='mt20'>
        <Button
          onClick={() => {
            dispatch(getUser({ name: "xxx" }))
          }}
          className='mr10'
        >
          add user age
        </Button>
        <Button
          onClick={() => {
            dispatch(addBookPage())
          }}
          className='mr10'
        >
          add book page
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: ADD_BOOK_PAGE_AUTO })
          }}
          className='mr10'
        >
          auto add book page
        </Button>
      </div>
      <div>{bookFetchLoading && <p>book is dispatching ...</p>}</div>
      <Card title='store' className='mt20'>
        {Object.keys(state).map((key, index) => {
          return (
            <p key={index}>
              {key}: {JSON.stringify(state[key])}
            </p>
          )
        })}
      </Card>
    </div>
  )
}

export default App

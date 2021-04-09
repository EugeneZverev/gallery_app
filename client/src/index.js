import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer'
import App from './components/App'
import './index.css'

const saveState = state => {
  try {
    const serialisedState = JSON.stringify(state)
    window.localStorage.setItem('app_state', serialisedState)
  } catch (err) {
    console.log(err)
  }
}
const loadState = () => {
  try {
    const serialisedState = window.localStorage.getItem('app_state')
    if (!serialisedState) return undefined

    return JSON.parse(serialisedState)
  } catch (err) {
    return undefined
  }
}

const oldState = loadState()

const store = createStore(
  rootReducer,
  oldState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(() => saveState(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
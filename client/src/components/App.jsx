import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Gallery from './Gallery/Gallery'
import RegisterForm from './RegisterForm/RegisterForm'
import LoginForm from './LoginForm/LoginForm'
import MainPage from './MainPage/MainPage'
import 'antd/dist/antd.css'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="Main">
        <Route exact path='/' render={() => <MainPage />} />
      </div>
      <div className="App">
        <Route exact path='/login' render={() => <LoginForm />} />
        <Route exact path='/register' render={() => <RegisterForm />} />
      </div>
      <Route exact path='/gallery' render={() => <Gallery />} />
    </BrowserRouter>
  )
}

export default App
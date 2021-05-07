import React from 'react'
import LoginForm from './loginForm'
import './index.css'

function Login() {
  return (
    <div className="row wrapper">
      <div className='col-6'>
        <div className="image-login"></div>
      </div>
      <div className='col-6'>
        <div className="wrapper-login-form">
          <div className="logo" />
          <h1>đăng nhập</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login

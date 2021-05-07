import React, { useState } from 'react'
import { loginRequest } from 'actions/authAction'
import { connect } from 'react-redux'

function LoginForm({
  loading,
  login
}) {
  const [error, setError] = useState({
    email: '',
    password: ''
  })
  const verifyEmail = (event) => {
    const emailInput = event.target.value
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailInput) {
      setError(preState => ({ ...preState, email: 'Email là bắt buộc' }))
    } else if (!regex.test(emailInput)) {
      setError(preState => ({ ...preState, email: 'Email không đúng định dạng' }))
    } else {
      setError(preState => ({ ...preState, email: '' }))
    }
  }

  const verifyPassword = (event) => {
    const passwordInput = event.target.value
    if (!passwordInput) {
      setError(preState => ({ ...preState, password: 'Password là bắt buộc' }))
    } else {
      setError(preState => ({ ...preState, password: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')
    login({ email, password })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className='error-message'>{error.email}</div>
      <div className='error-message'>{error.password}</div>
      <div className='item-wrapper'>
        <label htmlFor='email'>Email</label><br/>
        <input
          type='text'
          id='email'
          name='email'
          placeholder='Nhập email'
          onBlur={verifyEmail}
        />
      </div>
      <div className='item-wrapper'>
        <label htmlFor='password' >Password</label><br/>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Nhập password'
          onBlur={verifyPassword}
        />
      </div>
      <div className='item-wrapper button'>
        <button type='submit' disabled={error.email || error.password || loading}>Đăng nhập</button>
      </div>
    </form>
  )
}

const mapStateToProps = store => ({
  loading: store.auth.loading,
})

const mapDispatchToProps = dispatch => {
  return {
    login: ({ email, password }) => {
      dispatch(loginRequest({ email, password }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

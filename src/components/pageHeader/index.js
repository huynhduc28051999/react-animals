import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.css'
import { logoutRequest } from 'actions/authAction'

function PageHeader({ logout }) {
  const { pathname } = useLocation()
  return (
    <nav>
      <ul className="menu">
        <div className='container'>
          <li>
            <Link to='/home' className={/home/.test(pathname) ? 'active' : ''}>Home</Link>
          </li>
          <li className="rightli" style={{ float: 'right' }}>
            <a onClick={logout}>logout</a>
          </li>
        </div>
      </ul>
    </nav>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutRequest())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PageHeader)

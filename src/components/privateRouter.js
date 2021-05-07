import React from 'react'
import { Redirect } from 'react-router-dom'
import Layout from './layout'

export const PrivateRoute = props => {
  const {
    isAuth,
    children
  } = props

  if (!isAuth) return (<Redirect to='/login' />)
  return (
    <Layout>{children}</Layout>
  )
}
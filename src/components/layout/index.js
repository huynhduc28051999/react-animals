import PageHeader from 'components/pageHeader'
import React from 'react'

export default function Layout(props) {
  return (
    <div>
      <PageHeader />
      {props.children}
    </div>
  )
}

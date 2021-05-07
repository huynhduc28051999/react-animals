import React from 'react'
import './index.css'

export const Loading = () => {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='loader' />
    </div>
  )
}

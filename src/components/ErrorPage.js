import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError()
  return (
    <div className='text-center'>
        <h2>Oops!</h2>
        <p className="lead text-danger">{error.statusText}</p>
    </div>
  )
}

export default ErrorPage
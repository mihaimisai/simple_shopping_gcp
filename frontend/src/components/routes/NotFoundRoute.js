import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundRoute() {
  return (
    <div className='d-flex flex-column align-items-center mt-5'>
        <h2>404 Page not found!</h2>
        <Link className="btn btn-warning mt-5" to='/'>Back to login</Link>
    </div>
  )
}

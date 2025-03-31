import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundRoute() {
  return (
    <div>
        <h2>404 Page not found!</h2>
        <Link className="btn btn-warning" to='/'>Back to login</Link>
    </div>
  )
}

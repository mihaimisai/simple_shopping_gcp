import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function PrivateRoute() {

    const { currentUser } = useAuth()

    return (
        currentUser ? <Outlet /> : (
        <div>
            <h2>You need to login first</h2>
            <Link className="btn btn-warning mb-2 d-block col-2" to='/login'>Back to login</Link>
        </div>
        )
    )
}

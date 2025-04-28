import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function PrivateRoute() {

    const { currentUser } = useAuth()

    return (
        currentUser ? <Outlet /> : (
        <div className='d-flex flex-column align-items-center mt-5'>
            <h2>You need to login first</h2>
            <Link className="btn btn-warning mt-5" to='/'>Back to login</Link>
        </div>
        )
    )
}

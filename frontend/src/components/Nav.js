import React from 'react'
import { Link } from 'react-router-dom'


export default function Nav() {

    const navBtn = {
        'Dashboard' : '/',
        'Test' : '/test',
    }

    return (
    <div className='col-8 h-100 pb-5'>
        {/*if the user is logged it, render the full navigation*/}
        <div className='d-flex flex-column justify-content-between h-100'>
        
            <>
            <div>
                {Object.entries(navBtn).map(([name, path], index) =>{
                    return <Link className="btn btn-primary mb-2 d-block" to={path} key={index}>{name}</Link>
                })}
            </div>
            </>
    
        </div>
    </div>
    )
}

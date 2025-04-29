import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

//console.log(auth)

function SignupForm({setMessage}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { signup } = useAuth()
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setMessage('')
        if (password!==confirmPassword) {
            return setMessage("Password don't match")
        }
        try {
            setLoading(true)
            await signup(email, password)
            navigate('/shoppinglist')
        } catch(error) {
            setMessage(error.message)
        }
        setLoading(false)
    }

    

    return (<>
            <form onSubmit={handleSignup}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        className="form-control"
                        type="email"  
                        id="email" 
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value) }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        id="password" 
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value) }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value) }
                    />
                </div>
                <button disabled={loading} className="btn btn-primary" type="submit">Submit</button>
            </form>
    </>
    )
}

export default SignupForm
import React, {useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'

function LoginForm({setMessage}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            await login(email, password)
            navigate('/shoppinglist')
        } catch(error) {
            setMessage(error.message)
        }
        setLoading(false)
    }

    return <>
        <form onSubmit={handleLogin}>
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
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                    className="form-control"
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button disabled={loading} className="btn btn-primary" type="submit">Submit</button>
            <Link className="d-block my-3" to='/forgotpassword' >Forgot password?</Link>
        </form>
    </>
}

export default LoginForm
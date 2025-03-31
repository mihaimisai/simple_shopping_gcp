import React, {useState} from "react"
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

function LoginApp() {

    const [showLogin, setShowLogin] = useState(true)
    const [message, setMessage] = useState('')

    return (
        
        <div className="d-flex flex-column align-items-center justify-content-center">

            <div className="my-4">
                <button className="btn btn-warning" onClick={() => setShowLogin(!showLogin)}>
                    { showLogin ? 'Switch to Signup' : 'Switch to Login' }
                </button>
            </div>

            <div>
                {showLogin ? 
                    <LoginForm setMessage={setMessage}/>
                    :
                    <SignUpForm setMessage={setMessage}/>        
                }
            </div>

            <div className="my-4">
                {message && <div className='alert alert-danger mt-5 col-4'>{message}</div>}
                <p>Before using this app, you need to sign in.</p>
                <p className="text-info">For testing purposes you can use email: test@test.com and password: 123456</p>
            </div>

        </div>
    )
}

export default LoginApp
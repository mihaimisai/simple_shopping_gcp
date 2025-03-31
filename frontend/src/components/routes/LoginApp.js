import React, {useState} from "react"
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import Header from "../Header";

function LoginApp() {

    const [showLogin, setShowLogin] = useState(true)
    const [message, setMessage] = useState('')

    return (
        
        <div>
            <Header />
            <button className="btn btn-warning" onClick={() => setShowLogin(!showLogin)}>
                { showLogin ? 'Switch to Signup' : 'Switch to Login' }
            </button>
            
            {showLogin ? 
                <LoginForm setMessage={setMessage}/>
                :
                <SignUpForm setMessage={setMessage}/>        
            }
            
            <div>
              <div>
                {message && <div className='alert alert-danger mt-5 col-4'>{message}</div>}
                <p>Before using this app, you need to sign in.</p>
                <p className="text-info">For testing purposes you can use email: test@test.com and password: 123456</p>
              </div>
            </div>


        </div>
    )
}

export default LoginApp
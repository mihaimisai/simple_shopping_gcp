import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfileApp() {

  const {currentUser, changeName, changeEmail, changePassword, deleteProfile} = useAuth()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleChangeName(e) {
    e.preventDefault()
    setMessage('')
    if (!name) {
      setAlert("alert alert-danger")
      return setMessage('Name cannot be empty')
    }
    try {
      await changeName(name)
      setAlert("alert alert-success")
      setMessage("Name successfully changed")
    } catch(error) {
      setMessage('Name is not valid' + error.message)
      setAlert("alert alert-danger")
    }
    setName('')
  }

  async function handleChangeEmail(e) {
    e.preventDefault()
    setMessage('')
    if (!email) {
      setAlert('alert alert-danger')
      return setMessage('Email cannot be empty')
    }
    try {
      await changeEmail(email)
      setAlert("alert alert-success")
      setMessage('Email updated successfully to ' + email)
    } catch(error) {
      setMessage(error.message)
      setAlert("alert alert-danger")
    }
    setEmail('')
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert("alert alert-danger")
      return setMessage("Passwords don't match")
    }
    try {
      await changePassword(password)
      setMessage('Password changed successfully')
      setAlert("alert alert-success")
    } catch(error) {
      setAlert("alert alert-danger")
      setMessage(error.message)
      }
    setPassword('')
    setConfirmPassword('')
  }

  async function handleDelete(e) {
    try {
      await deleteProfile()
    } catch(error) {
      setAlert('alert alert-danger')
      setMessage(error.message)
    }
  }

  const manageUser = {
    'Change Name' : {
      'handle' : handleChangeName,
      'inputs' : [{
        'id' : 'name',
        'label' : 'Name:',
        'type' : 'text',
        'value' : name,
        'onChange' : (e) => setName(e.target.value)
      }]
      
    },
    'Update email' : {
      'handle' : handleChangeEmail,
      'inputs' : [{
        'id' : 'email',
        'label' : 'Email:',
        'type' : 'email',
        'value' : email,
        'onChange' : (e) => setEmail(e.target.value)
      }]
      
    },
    'Change password' : {
      'handle' : handleChangePassword,
      'inputs' : [
        {
          'id' : 'password',
          'label' : 'Password:',
          'type' : 'password',
          'value' : password,
          'onChange' : (e) => setPassword(e.target.value)
        },
        {
          'id' : 'confirmPassword',
          'label' : 'Confirm password:',
          'type' : 'password',
          'value' : confirmPassword,
          'onChange' : (e) => setConfirmPassword(e.target.value)
        }]
    }
  }

  return (
    <div className='m-5 d-flex flex-column align-items-center'>
      <h4 className='mb-3'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}!</h4>
      { message && 
      <div className={alert} role="alert">
        {message}
      </div>
      }
      
      {Object.entries(manageUser).map(([title, {handle, inputs}]) => (
        <div className="card lg-col-5 my-2 text-bg-dark border-primary" key={title}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <form onSubmit={handle}>
              {inputs.map(({id, label, type, value, onChange}) => (
                <div key={id} className='my-2'>
                <label htmlFor={id} className='me-2'>{label}</label>
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={onChange}
                />
                </div>
              ))}
              
              <button className='btn btn-primary ms-2' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      ))}

      <button className='btn btn-danger mt-5' onClick={handleDelete}>Delete Account</button>
      
    </div>
  )
}

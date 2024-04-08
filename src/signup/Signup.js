import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Authcontext'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import "../signup/Signup.scss"


const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    // Handle user registration form submission
    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
            } 
            catch (error) {
                setIsRegistering(false)
                setErrorMessage(error.message)
            }        
        }
    }
    
  return (
    <>
    {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
    <div className='pageContainer'>
        <div className='logoContainer'>
            <h1>SKR-FakeShop</h1>
        </div>
        <div className='loginContainer'>
            <div className='loginLogoContainer'>
                <h1>SKR-FakeShop</h1>
            </div>
            <div className='formContainer'>
                <div className='formWrapper'>
                    <span className='title'>Signup</span>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="email"
                            autoComplete='email'
                            required
                            value={email} 
                            onChange={(e) => { setEmail(e.target.value) }} 
                            placeholder='Email-Id' />
                        <input 
                            disabled={isRegistering}
                            type="password"
                            autoComplete='new-password'
                            required
                            value={password} 
                            onChange={(e) => { setPassword(e.target.value) }} 
                            placeholder='Password' />
                        <input 
                            disabled={isRegistering}
                            type="password"
                            autoComplete='off'
                            required
                            value={confirmPassword} 
                            onChange={(e) => { setConfirmPassword(e.target.value) }} 
                            placeholder='confirmPassword' />
                        <button
                        type="submit"
                        disabled={isRegistering}>
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        {/* Handle error message*/}
                        {errorMessage && (
                            <span>{errorMessage}</span>
                        )}
                    </form>
                    <div className='separateLine'></div>
                    <p>If you have an account - <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup
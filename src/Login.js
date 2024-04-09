import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from './firebase/auth'
import { useAuth } from './Authcontext'
import "./Login.scss"

const Login = () => {

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isGoogle, setIsGoogle] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
                setIsSigningIn(true)
                try{
                    await doSignInWithEmailAndPassword(email, password)
                }
                catch (error) {
                    setIsSigningIn(false)
                    setErrorMessage(error.message)
            }  
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isGoogle) {
            setIsGoogle(true)
            doSignInWithGoogle().catch(err => {
                setIsGoogle(false)
                setErrorMessage(err)
            })
        }
    }

  return (
    <div className='pageContainer'>
          {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
        <div className='logoContainer'>
            <h1>SKR-FakeShop</h1>
        </div>
        <div className='loginContainer'>
            <div className='loginLogoContainer'>
                <h1>SKR-FakeShop</h1>
            </div>
            <div className='formContainer'>
                <div className='formWrapper'>
                    <span className='title'>Login</span>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="email"
                            autoComplete='email'
                            required
                            value={email} 
                            placeholder='Email-id'  
                            onChange={(e) => { setEmail(e.target.value) }}/>
                        <input 
                            type="password"
                            autoComplete='current-password'
                            required
                            value={password} 
                            placeholder='Password'  
                            onChange={(e) => { setPassword(e.target.value) }}/>
                        <button
                            type="submit"
                            disabled={isSigningIn}>
                                {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                        <div className='googleSign'>
                            <p>or</p>
                            <button
                                disabled={isSigningIn}
                                onClick={(e) => { onGoogleSignIn(e) }}>
                                    {isGoogle ? 'Signing In...' : 'Continue with Google'}
                            </button>
                        </div>
                        {/* Handle error message*/}
                        {errorMessage && (
                            <span>{errorMessage}</span>
                        )}
                    </form>
                    <div className='separateLine'></div>
                    <p>you don't have an account? <Link to="Signup">Signup</Link></p>
                </div>
            </div>
        </div>
    </div>
)}

export default Login
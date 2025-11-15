import React, { useState } from 'react'
import './SignIn.css'

function SignIn() {
  const [currentState, setCurrentState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (currentState === "Sign Up" && (!data.name || !data.name.trim())) {
      newErrors.name = true
    }
    if (!data.email || !data.email.trim()) {
      newErrors.email = true
    }
    if (!data.password || !data.password.trim()) {
      newErrors.password = true
    }
    if (!termsAccepted) {
      newErrors.terms = true
    }
    
    console.log("Validation errors:", newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onLogin = async (event) => {
    event.preventDefault()
    
    console.log("Form submitted, validating...")
    console.log("Current data:", data)
    console.log("Terms accepted:", termsAccepted)
    
    if (!validateForm()) {
      console.log("Validation failed, errors:", errors)
      return
    }
    
    console.log("Validation passed")
    // Add login/signup logic here
    console.log(data)
  }

  return (
    <div className='signin-page'>
      <div className="signin-container">
        <div className="signin-form">
          <h2 className="signin-title">{currentState}</h2>
          
          <form onSubmit={onLogin}>
            {currentState === "Sign Up" && (
              <input 
                name='name' 
                onChange={onChangeHandler} 
                value={data.name} 
                type="text" 
                placeholder='Your name' 
                className={`signin-input ${errors.name ? 'error' : ''}`}
                required 
              />
            )}
            
            <input 
              name='email' 
              onChange={onChangeHandler} 
              value={data.email} 
              type="email" 
              placeholder='Your email' 
              className={`signin-input ${errors.email ? 'error' : ''}`}
              required 
            />
            
            <input 
              name='password' 
              onChange={onChangeHandler} 
              value={data.password} 
              type="password" 
              placeholder='Password' 
              className={`signin-input ${errors.password ? 'error' : ''}`}
              required 
            />
            
            <button type="submit" className="signin-button">
              {currentState === "Sign Up" ? "Create account" : "Login"}
            </button>
          </form>
          
          <div className="signin-terms">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked)
                if (errors.terms && e.target.checked) {
                  setErrors(prev => ({ ...prev, terms: false }))
                }
              }}
              className={errors.terms ? 'error' : ''}
            />
            <label htmlFor="terms" className={errors.terms ? 'error-text' : ''}>
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
          
          <p className="signin-switch">
            {currentState === "Login" 
              ? <>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></>
              : <>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
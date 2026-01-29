import { useState, useRef } from 'react';
import './LoginForm.css';


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);
  const [password, setPassword] = useState('');

  function changePasswordVisibility() {
    const passwordInputElem = passwordInputRef.current;
    if (passwordInputElem.value) {
      setShowPassword(!showPassword);
    }
  }

  function updatePassword(event) {
    if(event.target.value === '') {
      setShowPassword(false);
    }
    setPassword(event.target.value)
  }

  return (
    <>
      <div className="email-input">
        <input placeholder="Email" />
      </div>
      <div className="password-input">
        <input 
          placeholder="Password" 
          type={showPassword ? 'text' : 'password'} 
          onChange={updatePassword}
          value = { password }
          ref={passwordInputRef}
        />
        <button 
          onClick={changePasswordVisibility}
          className="show-password-button"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button>Login</button>
      <button>Sign up</button>
    </>
  )
}
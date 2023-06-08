import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

const SignupForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);

      const userInfo = {
        username,
        email,
        password
      }

      return dispatch(sessionActions.signup(userInfo))
        .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
              if (data?.errors) setErrors(data.errors);
              else if (data) setErrors([data]);
              else setErrors([res.statusText]);
        });
    }
    return setErrors(['Passwords must be the same']);
  };

  const getErrorByField = (field) => {
    return errors.find((error) => error.includes(field));
  };

  return (
    <div className="header-text-form-container">

      <div className="header-text">Sign Up</div>

      <div className="signup-form-container">

        <form onSubmit={handleSubmit} className="signup-form-capsule">

        <div className='signup-text-field'>
              <div className="page-text">Username</div>
              
              <input
              className={ getErrorByField('Username') ? 'signup-login-input-error' : 'signup-login-input'}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
              {getErrorByField('Username') ? <span className="errors">{getErrorByField('Username')}</span> : <></>}
          </div>

          <div className="signup-text-field">
              <div className="page-text">Email</div>

              <input
              className={ getErrorByField('Email') ? 'signup-login-input-error' : 'signup-login-input'}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              {getErrorByField('Email') ? <span className="errors">{getErrorByField('Email')}</span> : <></>}
          </div>

          <div className="signup-text-field">
              <div className="page-text">Password</div>

              <input
              className={ getErrorByField('Password') ? 'signup-login-input-error' : 'signup-login-input'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>

          <div className="signup-text-field">
              <div className="page-text">Confirm Password</div>

              <input
              className={ getErrorByField('Password') ? 'signup-login-input-error' : 'signup-login-input'}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
              {getErrorByField('Password') ? <span className="errors">{getErrorByField('Password')}</span> : <></>}
          </div>

          <button className="signup-login-button">Sign Up</button>

        </form>

      </div>
    </div>
  );
}

export default SignupForm;
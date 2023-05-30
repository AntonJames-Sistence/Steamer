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

  return (
    <div className="header-text-form-container">

      <div className="header-text">Sign Up</div>

      <div className="signup-login-form-container">

        <form onSubmit={handleSubmit} className="signup-login-form">

          <div className="text-field">
              <div className="page-text">Username</div>
              
              <input
              className="signup-login-input"
              id={`${errors.length > 0 ? 'has-errors' : ''}`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
          </div>

          <div className="text-field">
              <div className="page-text">Email</div>

              <input
              className="signup-login-input"
              id={`${errors.length > 0 ? 'has-errors' : ''}`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>

          <div className="text-field">
              <div className="page-text">Password</div>

              <input
              className="signup-login-input"
              id={`${errors.length > 0 ? 'has-errors' : ''}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>

          <div className="text-field">
              <div className="page-text">Confirm Password</div>

              <input
              className="signup-login-input"
              id={`${errors.length > 0 ? 'has-errors' : ''}`}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
          </div>

          <button className="signup-login-button">Sign Up</button>

          <ul className="errors">
              {errors.map(error => <li key={error}>{error}</li>)}
          </ul>

        </form>

      </div>
    </div>
  );
}

export default SignupForm;
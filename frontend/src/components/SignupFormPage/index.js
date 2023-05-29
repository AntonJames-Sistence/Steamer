import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'

function SignupFormPage() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) return <Redirect to="/" />;

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
    <div className="signup-login-container">
        <form onSubmit={handleSubmit} className="signup-login-form">

        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <div className="text-field">
            <div className="page-text">Username:</div>
            
            <input
            className="signup-login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>

        <div className="text-field">
            <div className="page-text">Email:</div>

            <input
            className="signup-login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        <div className="text-field">
            <div className="page-text">Password:</div>

            <input
            className="signup-login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>

        <div className="text-field">
            <div className="page-text">Confirm Password:</div>

            <input
            className="signup-login-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </div>

        <button className="signup-login-button">Sign Up</button>

        </form>
    </div>
  );
}

export default SignupFormPage;
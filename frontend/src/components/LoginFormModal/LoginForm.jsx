import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const LoginForm = () => {
    // dispatch for frontend login functionality
    const dispatch = useDispatch();

    // useState hook for dynamic input update
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // main logic for dispatching login
    const handleSubmit = (e) => {
        e.preventDefault();

        const userInfo = {
            credential,
            password
        }

        return dispatch(sessionActions.login(userInfo))
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

    const handleDemo = (e) => {
        e.preventDefault();

        const demoUser = {
            credential: 'DemoUser',
            password: 'password'
        }

        return dispatch(sessionActions.login(demoUser));
    }

    return (
        <div className="header-text-form-container">
            
            <div className="header-text">Sign In</div>

            <div className="signup-login-form-container">

                <form onSubmit={handleSubmit} className="signup-login-form">

                    <div className="login-left-col">
                        <div className="text-field">
                            <div className="page-text" id="page-text-blue-spotlight">Sign in with username or email</div>

                                <input
                                className="signup-login-input"
                                id={`${errors.length > 0 ? 'has-errors' : ''}`}
                                type="text"
                                value={credential}
                                onChange={ (event) => setCredential(event.target.value) }
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
                                onChange={ (event) => setPassword(event.target.value) }
                                required
                                />
                        </div>

                        <button className="signup-login-button" id="sign-in">Sign In</button>

                        <div className="demo-offer">Please log in using your credentials or feel free to explore our platform by using demo user account.</div>

                        <button className="signup-login-button" onClick={handleDemo}>Demo User</button>
                    </div>

                    
                    <div className="login-right-col">
                        <div className="torque-qr">Check more projects</div>
                        <div className="qr-code"></div>
                    </div>

                    

                </form>

                    <ul className="errors">
                        {errors.map(error => <div key={error}>{error}</div>)}
                    </ul>
            </div>

        </div>
    )
}

export default LoginForm;
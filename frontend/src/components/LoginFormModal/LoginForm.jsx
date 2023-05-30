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

    return (
        <div className="header-text-form-container">
            
            <div className="header-text">Sign In</div>

            <div className="signup-login-form-container">

                <form onSubmit={handleSubmit} className="signup-login-form">

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

                    <button className="signup-login-button">Sign In</button>

                    <ul className="errors">
                        {errors.map(error => <div key={error}>{error}</div>)}
                    </ul>

                </form>
            </div>

        </div>
    )
}

export default LoginForm;
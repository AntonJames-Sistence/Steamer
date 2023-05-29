import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


const LoginFormPage = () => {
    // dispatch for frontend login functionality
    const dispatch = useDispatch();

    // useState hook for dynamic input update
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // for redirection purposes
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return <Redirect to="/" />;

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
        <div className="signup-login-container">
            <form onSubmit={handleSubmit} className="signup-login-form">

                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <div className="text-field">
                    <div className="page-text" id="page-text-blue-spotlight">Sign in with username or email</div>

                        <input
                        className="signup-login-input"
                        type="text"
                        value={credential}
                        onChange={ (event) => setCredential(event.target.value) }
                        />
                </div>

                <div className="text-field">
                    <div className="page-text">Password</div>

                        <input
                        className="signup-login-input"
                        type="password"
                        value={password}
                        onChange={ (event) => setPassword(event.target.value) }
                        />
                </div>

                <button className="signup-login-button">Sign In</button>
            </form>
        </div>
    )
}

export default LoginFormPage;
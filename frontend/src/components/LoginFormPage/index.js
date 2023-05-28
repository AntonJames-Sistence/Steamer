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

        dispatch(sessionActions.login(userInfo));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Username / Email
                        <input
                        type="text"
                        value={credential}
                        onChange={ (event) => setCredential(event.target.value) }
                        />
                    </label>
                </div>

                <div>
                    <label>Password
                        <input
                        type="password"
                        value={password}
                        onChange={ (event) => setPassword(event.target.value) }
                        />
                    </label>
                </div>

                <button>Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage;
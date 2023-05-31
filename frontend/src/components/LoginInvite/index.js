import { useState } from 'react';
import './LoginInvite.css'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';

const LoginInvite = () => {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);


    return (
        <div className="login-invite-wrap">

            <div className="login-invite-capsule">
                <div className="invite-text">
                    <span>Looking for recommendations?</span>
                </div>
            </div>

            <div className="login-invite-capsule">
                <div className="button-text-holder">
                    <p>Sign in to view personalized recommendations</p>

                    <div>
                        <a className="green-signin-button" onClick={() => setShowLogInModal(true)}><span>Sign In</span></a>
                        {showLogInModal && (
                            <Modal onClose={() => setShowLogInModal(false)}>
                                <LoginForm />
                            </Modal>
                        )}
                    </div>

                    <span id='signup-text'>Or <a onClick={() => setShowSignUpModal(true)}>sign up</a> and join Steam for free</span>
                    {showSignUpModal && (
                        <Modal onClose={() => setShowSignUpModal(false)}>
                            <SignupForm />
                        </Modal>
                    )}
                </div>
            </div>

        </div>
    )
}

export default LoginInvite;
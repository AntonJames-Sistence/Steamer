import './LoginInvite.css'

const LoginInvite = () => {
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
                        <a href="#" className="green-signin-button"><span>Sign In</span></a>
                    </div>

                    <span id='signup-text'>Or <a href='#'>sign up</a> and join Steam for free</span>
                </div>
            </div>

        </div>
    )
}

export default LoginInvite;
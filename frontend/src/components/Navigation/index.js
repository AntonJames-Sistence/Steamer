import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileDropdownMenu';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logoPath from '../../resources/logo.png'

const Navigation = () => {
    // taking sessionUser from store
    const sessionUser = useSelector(state => state.session.user);

    // setup variable to hold session links
    let sessionLinks;
    // if currentUser !== null
    if (sessionUser) {
        // assign variable to be a JSX component with ProfileButton component inside, also
        // providing currentUser details to ProfileButton
        sessionLinks = (
        <ProfileButton currentUser={sessionUser} />
        );
    } else {
        // in case app does not have currentUser, it assigns two links to login and signup
        sessionLinks = (
        <>
            <LoginFormModal />
            &nbsp;|&nbsp;
            <SignupFormModal />
        </>
        );
    }

    return (
        <div className='global-navbar-container'>
            <div className='global-navbar'>

                    <div className='logo'>
                        <a href='/'>
                        <img id='logo' src={logoPath} alt="Steamer logo" />
                        </a>
                        <a href='/'>
                        <div id='logo-name-holder'>STEAMER</div>
                        </a>
                    </div>

                    <div className='global-actions'>
                        {sessionLinks}
                    </div>

                    <div className='nav-links-container'>
                        <a href='https://github.com/AntonJames-Sistence/Steamer' className='nav-link' target='_blanc'>About Steamer</a>
                        <a href='https://github.com/AntonJames-Sistence' className='nav-link' target='_blanc'>GitHub</a>
                        <a href='https://www.linkedin.com/in/anton-james-ja/' className='nav-link' target='_blanc'>LinkedIn</a>
                        <a href='https://wellfound.com/anton-james' className='nav-link' target='_blanc'>Wellfound</a>
                    </div>
                
            </div>
        </div>
    );
}

export default Navigation;
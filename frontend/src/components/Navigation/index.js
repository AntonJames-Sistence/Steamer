import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

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
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </>
        );
    }

    return (
        <ul>
        <li>
            <NavLink exact to="/">Steamer logo </NavLink> 
            {sessionLinks}
        </li>
        </ul>
    );
}

export default Navigation;
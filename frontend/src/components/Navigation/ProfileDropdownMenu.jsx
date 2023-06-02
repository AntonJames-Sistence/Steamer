import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ( {currentUser} ) => {
    const dispatch = useDispatch();
    // useState hook variable to hide and show user dropdown menu
    const [showMenu, setShowMenu] = useState(false);
    
    // open/hide menu logic
    const openMenu = () => {
      // prevents showing menu in case it is already open
      if (showMenu) return;
      // shows menu
      setShowMenu(true);
    };
 
    useEffect(() => {
        // prevents from hiding the menu if it is alredy hidden
        if (!showMenu) return;
    
        // helper method to pass in event listener
        const closeMenu = () => {
          setShowMenu(false);
        };
    
        // event listener for click on menu button
        document.addEventListener('click', closeMenu);
      
        // removing event listener, good practice
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    
    // logout handler
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        
        window.location.href = '/';
    };

    return (
        <>
          <div id="username">
          <a onClick={openMenu}>{currentUser.username}</a>
          </div>
          {/* if showMenu === true then render all code in () else dousn't render  */}
          { showMenu && (
            <div className="profile-popup-menu">
              <a className="popup-menu-item">View profile</a>
              <a className="popup-menu-item">Account details</a>
              <a className="popup-menu-item" onClick={logout}>Logout: <span className="current-user">{currentUser.username}</span></a>
            </div>
          )}
        </>
    );

}

export default ProfileButton;
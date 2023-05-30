import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

const LoginFormModal = () => {
    // useState hook for showing and hiding modal
    const [showModal, setShowModal] = useState(false);
  
    // wrapper for LoginForm component, utilizing Modal component to render 
    // LogIn form when showModal variable is true
    return (
      <>
        <a onClick={() => setShowModal(true)}>login</a>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
      </>
    );
}
  
export default LoginFormModal;
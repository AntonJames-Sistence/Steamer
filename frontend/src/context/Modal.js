import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

// classic react context hook
const ModalContext = React.createContext();

// component witch renders children
export const ModalProvider = ({ children }) => {
    // useRef is a react hook to create mutable reference to a value across re-render of component
    const modalRef = useRef();
    const [value, setValue] = useState();
    const [showModal, setShowModal] = useState(false);
  
    // useEffect is there to assign current useRef value to variable
    useEffect(() => {
      setValue(modalRef.current);
    }, []);
  
    // wrapper provides access to value for its children
    return (
      <>
        <ModalContext.Provider value={value}>
          {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
      </>
    );
}

// modal component takes helper callback function and children components to nest inside
export const Modal = ({ onClose, children }) => {
    // takes value provided by modalContext 
    const modalNode = useContext(ModalContext);
    // doesn't render if madalNode doesn't exists
    if (!modalNode) return null;
  
    // creating portal with modal overlay with modalNode address
    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">
          {children}
        </div>
      </div>,
      modalNode
    );
}

export default ModalContext;
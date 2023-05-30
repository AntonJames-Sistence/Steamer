import { useState } from "react"
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";


const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <a onClick={() => setShowModal(true)}>signup</a>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
};

export default SignupFormModal;
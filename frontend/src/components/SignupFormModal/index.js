import { useState } from "react"
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";


const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>signup</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
};

export default SignupFormModal;
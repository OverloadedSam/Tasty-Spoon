import React from "react";
import SignInForm from "./SignInForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SignInModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                backdrop="static"
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign In Here!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignInForm closeModal={props.onHide} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="info">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignInModal;

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = () => {};

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b> will be delete!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleSubmitDeleteUser();
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;

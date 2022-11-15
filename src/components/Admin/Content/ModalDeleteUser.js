import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { deleteUser } from '../../../service/apiService';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

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

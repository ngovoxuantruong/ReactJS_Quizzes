import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FcPlus } from 'react-icons/fc';

import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('');
        setImage('');
        setPreViewImage('');
    };

    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewimage, setPreViewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage('');
            if (dataUpdate.image) {
                setPreViewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImg = (event) => {
        setPreViewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        View <a href=""></a> user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Roles</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                                disabled
                            >
                                <option value="ROLE">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus /> Upload file image
                            </label>
                            <input
                                disabled
                                type="file"
                                id="labelUpload"
                                hidden
                                onChange={(event) => handleUploadImg(event)}
                            />
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewimage ? <img src={previewimage} alt="Image" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewUser;

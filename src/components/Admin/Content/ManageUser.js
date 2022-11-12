import { useState, useEffect } from 'react';

import { FcPlus } from 'react-icons/fc';
import './ManageUser.scss';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import TableUser from './TableUser';
import { getAllUsers } from '../../../service/apiService';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [dataUpdate, setDateUpdate] = useState({});

    const [listUsers, setListUsers] = useState([
        {
            id: 10,
            username: 'YiChen',
            email: 'ngovoxuantruong8@gmail.com',
            role: 'USER',
        },
        {
            id: 11,
            username: 'Charlie',
            email: 'ngovoxuantruong7@gmail.com',
            role: 'USER',
        },
    ]);

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDateUpdate(user);
    };

    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>

            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus /> Add new users
                    </button>
                </div>

                <div className="table-users-container">
                    <TableUser listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />

                <ModalUpdateUser setShow={setShowModalUpdateUser} show={showModalUpdateUser} dataUpdate={dataUpdate} />
            </div>
        </div>
    );
};

export default ManageUser;

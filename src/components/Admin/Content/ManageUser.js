import { useState, useEffect } from 'react';

import { FcPlus } from 'react-icons/fc';
import './ManageUser.scss';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';

import { getAllUsers, getUserWithPaginate } from '../../../service/apiService';
import TableUserPaginate from './TableUserPaginate';

const ManageUser = (props) => {
    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [showModalViewUser, setShowModalViewUser] = useState(false);

    const [dataUpdate, setDateUpdate] = useState({});

    const [dataDelete, setDateDelete] = useState({});

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
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDateUpdate(user);
    };

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDateUpdate(user);
    };

    const resetUpdateDate = () => {
        setDateUpdate({});
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDateDelete(user);
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
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        pageCount={pageCount}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    setShow={setShowModalUpdateUser}
                    show={showModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateDate={resetUpdateDate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser dataUpdate={dataUpdate} show={showModalViewUser} setShow={setShowModalViewUser} />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageUser;

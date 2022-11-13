const TableUser = (props) => {
    const { listUsers } = props;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers &&
                    listUsers.length > 0 &&
                    listUsers.map((listUser) => {
                        return (
                            <tr key={listUser.id}>
                                <td>{listUser.id}</td>
                                <td>{listUser.username}</td>
                                <td>{listUser.email}</td>
                                <td>{listUser.role}</td>
                                <td>
                                    <button
                                        onClick={() => props.handleClickBtnView(listUser)}
                                        className="btn btn-secondary"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => props.handleClickBtnUpdate(listUser)}
                                        className="btn btn-warning mx-3"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => props.handleClickBtnDelete(listUser)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                {listUsers && listUsers.length === 0 && (
                    <tr>
                        <td colSpan={4}>Data not found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableUser;

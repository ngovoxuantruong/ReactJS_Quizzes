import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props) => {
    const { listUsers, pageCount } = props;

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
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
                        listUsers.map((listUser, index) => {
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
                            <td colSpan={5}>Data not found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="page-pagination d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    );
};

export default TableUserPaginate;

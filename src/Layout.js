import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/HomePage/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

const Layout = (props) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="users" element={<User />} />
                    </Route>

                    <Route path="/admins" element={<Admin />}>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                    </Route>

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<SignUp />} />
                </Routes>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </BrowserRouter>
        </>
    );
};

export default Layout;

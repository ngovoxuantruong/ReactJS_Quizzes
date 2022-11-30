import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import Admin from './components/Admin/Admin';
import HomePage from './components/HomePage/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';

const NotFound = () => {
    return (
        <div className="container alert alert-danger text-center mt-3">
            404. Not found your data in current URL
        </div>
    );
};

const Layout = (props) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="users" element={<ListQuiz />} />
                    </Route>

                    <Route path="/quiz/:id" element={<DetailQuiz />} />

                    <Route path="/admins" element={<Admin />}>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="*" element={<NotFound />} />
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

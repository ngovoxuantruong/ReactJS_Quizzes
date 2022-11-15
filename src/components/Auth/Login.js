import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { postLogin } from '../../service/apiService';
import './Login.scss';

const Login = (props) => {
    const navigation = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Validate

        // Submit
        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigation('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    const handleSignUp = () => {
        navigation('/signup');
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>

                <button onClick={() => handleSignUp()}>Sign up</button>
            </div>

            <div className="title col-4 mx-auto">XuanTruong</div>

            <div className="welcome col-4 mx-auto">Hello, who&rsquo;s this?</div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <p className="forgot-password">Forgot password ?</p>

                <div>
                    <button className="btn-submit" onClick={() => handleLogin()}>
                        Login to XuanTruong
                    </button>
                </div>

                <p className="back" onClick={() => navigation('/')}>
                    &lt;&lt; Go to Homepage
                </p>
            </div>
        </div>
    );
};

export default Login;

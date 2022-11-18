import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import { postLogin } from '../../service/apiService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner2 } from 'react-icons/im';

import './Login.scss';

const Login = (props) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleLogin = async () => {
        const isValid = validateEmail(email);

        if (!isValid) {
            toast.error('Invalid email');
            return;
        }

        if (!password) {
            toast.error('Invalid password');
            return;
        }

        setIsLoading(true);

        // Submit
        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            dispatch(doLogin());
            toast.success(data.EM);
            setIsLoading(false);
            navigation('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
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

                <div className="form-group input-password">
                    <div>
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span className="toggle-eyes" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </span>
                    </div>
                </div>

                <p className="forgot-password">Forgot password ?</p>

                <div>
                    <button className="btn-submit" onClick={() => handleLogin()} disabled={isLoading}>
                        {isLoading === true && <ImSpinner2 className="loader-icon" />}
                        <span> Login to XuanTruong</span>
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

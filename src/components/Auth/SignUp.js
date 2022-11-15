import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';

import { postCreateNewUser } from '../../service/apiService';
import { getAllUsers } from '../../service/apiService';
import './Signup.scss';

const SignUp = (props) => {
    const navigation = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleSignUp = async () => {
        const isValid = validateEmail(email);

        if (!isValid) {
            toast.error('Invalid email');
            return;
        }

        if (!password) {
            toast.error('Invalid password');
            return;
        }

        let data = await postCreateNewUser(email, password, username);
        console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    const handleLogin = () => {
        navigation('/login');
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Already have an account ?</span>

                <button onClick={() => handleLogin()}>Login</button>
            </div>

            <div className="title col-4 mx-auto">XuanTruong</div>

            <div className="welcome col-4 mx-auto">
                Get better data with conversational forms, surveys, quizzes & more.
            </div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>

                <div className="form-group input-password">
                    <div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            value={password}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span className="toggle-eyes" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </span>
                    </div>
                </div>

                <div>
                    <button className="btn-submit" onClick={() => handleSignUp()}>
                        Create my free account
                    </button>
                </div>

                <p className="back" onClick={() => navigation('/')}>
                    &lt;&lt; Go to Homepage
                </p>
            </div>
        </div>
    );
};

export default SignUp;

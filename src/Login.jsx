// Login.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);

        if (email) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    useEffect(() => {
        if (email) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/user/login_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/blog');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('There was an error submitting the form', error);
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo-container">
                    <img src="../public/logo.jpg" alt="Logo" className="logo" />
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="form-title">Login</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="input-field"
                        style={{ width: '94%' }}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        style={{ width: '94%' }}
                    />
                    <button type="submit" className="submit-button" disabled={isButtonDisabled}>Login</button>
                    <div className="additional-links">
                        <p>
                            Dont have an account? <a href="/signup" className="link">Sign up</a>
                        </p>
                        <p>
                            If you are admin <a href="/adminlogin" className="link">Click here</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

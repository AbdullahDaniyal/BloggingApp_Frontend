// AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3000/admin/login_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Needed for cookies to be sent
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error("Response not OK", response);
            }

            const data = await response.json();
            if (response.ok) {
                navigate('/adminblogs');
            } else {
                setError(data);
            }
        } catch (error) {
            console.error("Error in fetch", error);
        }
    };

    return (
        <div className="admin-login-container">
            <form className="admin-login-form" onSubmit={handleLogin}>
                <img src='../public/logo.jpg'
                    style={
                        {
                            height: '150px',
                            width: '150px'
                        }
                    }
                ></img>
                <h2>Admin Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" className="login-button">Login</button>
                <p
                    style={{
                        position: 'relative',
                        right: '79px'
                    }}
                >Dont have an account <a href="/signupadmin">Click here</a></p>
            </form>
        </div>
    );
}

export default AdminLogin;

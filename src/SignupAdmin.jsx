// SignupAdmin.jsx
import { useState } from 'react';
import './SignupAdmin.css';

function SignupAdmin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const response = await fetch('http://localhost:3000/admin/signup_admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            setSuccess(`Admin account for ${username} created successfully.`);
            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            const data = await response.json();
            setError(data.message || 'An error occurred during signup.');
        }
    };

    return (
        <div className="signup-admin-container">
            <form className="signup-admin-form" onSubmit={handleSignup}>
                <div className="signup-logo"></div>
                <h2>Admin Signup</h2>
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                <p
                    style={{
                        position: 'relative',
                        right: '76px'
                    }}
                >Already have an account <a href='/adminlogin'>Click here</a></p>
            </form>
        </div>
    );
}

export default SignupAdmin;

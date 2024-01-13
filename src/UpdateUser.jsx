// UpdateUser.jsx

import { useState } from 'react';
import './UpdateUser.css';

function UpdateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/update_credentials_user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect to another page
                console.log('Credentials updated successfully');
            } else {
                console.error('Failed to update credentials');
            }
        } catch (error) {
            console.error('There was an error updating credentials', error);
        }
    };

    return (
        <div className="update-credential-container">
            <h2>Update Credentials</h2>
            <div className="input-field">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new username"
                />
            </div>
            <div className="input-field">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter new email"
                />
            </div>
            <div className="input-field">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
            </div>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdateUser;

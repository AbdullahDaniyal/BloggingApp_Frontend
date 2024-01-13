import { useState } from 'react';
import './signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your signup API endpoint
            const response = await fetch('http://localhost:3000/user/signup_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to the login page after successful signup
                window.location.href = '/'; // Change the URL to your login page
            } else {
                // Handle error cases here, e.g., display error messages to the user
                const errorData = await response.json();
                console.error('Signup Error:', errorData.message);
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    return (
        <div className="signup-container">
            <img src="logo.jpg" alt="Logo" className="logo" />
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <a href="/">Login</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;

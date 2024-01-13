// ViewUser.jsx
import { useEffect, useState } from 'react';
import './ViewUser.css';

function ViewUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch users data from the server when the component mounts
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/view_all_users', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('There was an error fetching users', error);
        } finally {
            setLoading(false);
        }
    };

    const disableUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/disable_user/${username}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                // Refresh the user list after disabling
                fetchUsers();
            } else {
                console.error('Failed to disable user');
            }
        } catch (error) {
            console.error('Error disabling user', error);
        }
    };

    // Function to enable a user by username
    const enableUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/enable_user/${username}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                // Refresh the user list after enabling
                fetchUsers();
            } else {
                console.error('Failed to enable user');
            }
        } catch (error) {
            console.error('Error enabling user', error);
        }
    };


    return (
        <div className="view-user-container">
            <h2>View Users</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="user-list">
                    {users.map((user, index) => (
                        <div key={index} className="user-card">
                            <h3>Username: {user.username}</h3>
                            <p>Email: {user.email}</p>
                            <p>Disabled: {user.disabled ? 'Yes' : 'No'}</p>
                            {user.disabled ? (
                                <button
                                    style={{
                                        backgroundColor: 'red',
                                    }}
                                    onClick={() => enableUser(user.username)}>Enable User</button>
                            ) : (
                                <button
                                    style={{
                                        backgroundColor: 'green',
                                    }}
                                    onClick={() => disableUser(user.username)}>Disable User</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewUser;

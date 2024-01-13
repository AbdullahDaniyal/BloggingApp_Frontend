// AdminBlogs.jsx
import { useEffect, useState } from 'react';
import './AdminBlogs.css';

function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/admin/get_all_blogs_admin', {
                    method: 'GET',
                    credentials: 'include', // Necessary for including the session cookie
                });
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('There was an error fetching the blogs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleToggleBlogStatus = async (title, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/get_blog_post/${encodeURIComponent(title)}/${currentStatus ? 'enable' : 'disable'}`, {
                method: 'PUT',
                credentials: 'include',
            });
            if (response.ok) {
                // Update the blog's status in the state
                const updatedBlogs = [...blogs];
                const blogIndex = updatedBlogs.findIndex(blog => blog.title === title);
                if (blogIndex !== -1) {
                    updatedBlogs[blogIndex].disabled = !currentStatus;
                    setBlogs(updatedBlogs);
                }
            } else {
                console.error('Failed to toggle blog status');
            }
        } catch (error) {
            console.error('There was an error toggling the blog status', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-blogs-container">
            <h1>Admin Blog Management</h1>
            <div className="blogs-list">
                <div className="button-in-row">
                    <button
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '35%'
                        }}
                        onClick={() => window.location.href = '/viewuser'}>View All user</button>
                </div>
                {blogs.map((blog, index) => (
                    <div key={index} className="blog-item">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <div className="blog-details">
                            <span>Author: {blog.author}</span>
                            <span>Date: {new Date(blog.date).toLocaleDateString()}</span>
                            <span>Average Rating: {blog.avgrating.toFixed(2)}</span>
                            <span>Status: {blog.disabled ? 'Disabled' : 'Active'}</span>
                            <button
                                style={{
                                    backgroundColor: blog.disabled ? 'red' : 'green',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '43%',
                                    position: 'relative',
                                    left: '200px'
                                }}
                                onClick={() => handleToggleBlogStatus(blog.title, blog.disabled)}>
                                {blog.disabled ? 'Enable Blog' : 'Disable Blog'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBlogs;

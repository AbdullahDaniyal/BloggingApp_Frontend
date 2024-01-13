import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewUserBlogs.css'; // Make sure to create a corresponding CSS file

function ViewUserBlogs() {
    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/blog/get_all_blogs_of_user', {
                    credentials: 'include', // Necessary for authenticated routes
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserBlogs(data);
                } else {
                    console.error('Failed to fetch user blogs');
                }
            } catch (error) {
                console.error('Error fetching user blogs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, []);

    const deleteBlog = async (title) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const response = await fetch(`http://localhost:3000/blog/delete_blog/${title}`, {
                    method: 'DELETE',
                    credentials: 'include', // Necessary for authenticated routes
                });
                if (response.ok) {
                    alert(`Blog titled "${title}" deleted successfully`);
                    setUserBlogs(userBlogs.filter(blog => blog.title !== title));
                } else {
                    alert('Failed to delete the blog');
                }
            } catch (error) {
                console.error('There was an error deleting the blog', error);
            }
        }
    };

    if (loading) {
        return <div className="loading-container"><div>Loading user blogs...</div></div>;
    }

    return (
        <div className="blog-container">
            <h1>User Blogs</h1>
            <Link to="/updateuser" className="update-user-button">Update User</Link>
            {userBlogs.length > 0 ? (
                userBlogs.map((blog, index) => (
                    <div key={index} className="blog-post">
                        <h2>{blog.title}</h2>
                        <p className="black-text">{blog.content}</p>
                        <div className="blog-footer">
                            <span>Author: {blog.author}</span>
                            <span>Date: {new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                        <Link to={`/updateblog`} className="user-button">
                            <img src="../public/update.png" alt="Update" className="user-button update-icon" />
                        </Link>
                        <img src="../public/bin.png" alt="Delete" className="user-button bin-icon" onClick={() => deleteBlog(blog.title)} />
                    </div>
                ))
            ) : (
                <div>No blogs found for this user.</div>
            )}
        </div>
    );
}

export default ViewUserBlogs;

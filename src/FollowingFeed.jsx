import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FollowingFeed.css';

function FollowingFeed() {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowingFeed = async () => {
            try {
                const response = await fetch('http://localhost:3000/blog/get_following_user_feed', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setFeed(data);
                } else {
                    console.error('Failed to fetch following feed');
                }
            } catch (error) {
                console.error('There was an error fetching following feed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowingFeed();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="feed-container">
            <h1
                style={{ marginBottom: '20px' }}
            >Following Feed</h1>
            {feed.map((blog, index) => (
                <div key={index} className="blog-post">
                    <h2>{blog.title}</h2>
                    <p className="black-text">{blog.content}</p>
                    <div className="blog-footer">
                        <span>Author: {blog.author}</span>
                        <span>Date: {blog.date}</span>
                    </div>
                </div>
            ))}
            <Link to="/createblog" className="user-button">
                <img src="../public/plus.png" alt="User" className="user-image"
                    style={{
                        position: 'fixed', top: '721px', right: '47px', width: '50px', height: '50px'
                    }}
                />
            </Link>
        </div>
    );
}

export default FollowingFeed;

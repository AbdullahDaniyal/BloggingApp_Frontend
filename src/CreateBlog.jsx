// CreateBlog.jsx

import { useState } from 'react';
import './CreateBlog.css';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        // Perform the submission logic here
        try {
            const response = await fetch('http://localhost:3000/blog/create_blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title, author, content }),
            });
            if (response.ok) {
                console.log('Blog created successfully');
                // Optionally, you can redirect to another page here
            } else {
                console.error('Failed to create the blog');
            }
        } catch (error) {
            console.error('There was an error creating the blog', error);
        }
    };

    return (
        <div className="create-blog-container">
            <h2>Create a Blog</h2>
            <div className="create-blog-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Publish</button>
            </div>
        </div>
    );
}

export default CreateBlog;

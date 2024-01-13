import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UpdateBlog.css';

function UpdateBlog() {
    // const navigate = useNavigate(); // Access the navigate function
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        // Perform validation if needed

        // Create a JSON object with the title and content
        const data = { title, content }; // Include title in data

        try {
            const response = await fetch('http://localhost:3000/blog/update_blog', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.text();
                setMessage(result);
            } else {
                const error = await response.text();
                setMessage(`Error: ${error}`);
            }
        } catch (error) {
            console.error('There was an error updating the blog', error);
        }
    };

    return (
        <div className="update-blog-container">
            <h2>Update Blog</h2>
            <div className="update-form">
                {/* Text input for the title */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Update Blog</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UpdateBlog;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BlogPage.css';

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [commentText, setCommentText] = useState(''); // State for user comments
  const [ratingValue, setRatingValue] = useState(1); // State for user ratings
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showCommentsForPost, setShowCommentsForPost] = useState(null); // State to track the post for which comments are displayed
  const [addsomething, setaddsomething] = useState(null); // State to track the post for which comments are displayed

  const fetchNotificationsCount = async () => {
    // Replace with actual route to get notifications count
    const response = await fetch('http://localhost:3000/blog/notifications_user', {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setNotificationCount(data.count);
    } else {
      console.error('Failed to fetch notifications count');
    }
  };

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/blog/get_all_blogs_pagination?page=${page}`, {
        method: 'POST',
        credentials: 'include', // since you're likely using cookies for auth
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, limit: 3 }), // Send the current page and limit as the body
      });
      if (response.ok) {
        const data = await response.json();
        const updatedBlogs = data.blogs.map(blog => ({
          ...blog,
          isFollowing: false // or some condition based on your logic
        }));
        setBlogs(updatedBlogs);
        setTotalPages(data.totalPages); // Set the total pages for pagination
      } else {
        // Handle errors here
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('There was an error fetching the blogs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/blog/search_blog_filter/${searchTitle}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to search blogs');
      }
    } catch (error) {
      console.error('There was an error searching blogs', error);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleSortByDate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/blog/sorted_blogs_date', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setSearchResults([]); // Clear any search results
      } else {
        console.error('Failed to fetch sorted blogs by date');
      }
    } catch (error) {
      console.error('There was an error fetching sorted blogs', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch and sort blogs by title
  const handleSortByTitle = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/blog/sorted_blogs_title', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setSearchResults([]); // Clear any search results
      } else {
        console.error('Failed to fetch sorted blogs by title');
      }
    } catch (error) {
      console.error('There was an error fetching sorted blogs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRating = async (title, ratings) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/get_all_blogs/${title}/ratings`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ratings }),
      });
      if (response.ok) {
        // Handle success, perhaps update the UI accordingly
        console.log('Rating added successfully');
        fetchBlogs(currentPage);

      } else {
        // Handle errors here
        console.error('Failed to add rating');
      }
    } catch (error) {
      console.error('There was an error adding the rating', error);
    }
  };

  const handleAddComment = async (title, comments) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/get_all_blogs/${title}/comments`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments }),
      });
      if (response.ok) {
        // Handle success, perhaps update the UI accordingly
        console.log('Comment added successfully');
        fetchBlogs(currentPage);
      } else {
        // Handle errors here
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('There was an error adding the comment', error);
    }
  };

  const handleFollowUser = async (username, blogTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/user/follow_user`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        // Handle success, perhaps update the UI accordingly
        console.log(`You are now following ${username}`);
        setBlogs(blogs.map(blog => {
          if (blog.title === blogTitle) {
            return { ...blog, isFollowing: true };
          }
          return blog;
        }));
      } else {
        console.log(response)
        // Handle errors here
        console.error('Failed to follow user');
      }
    } catch (error) {
      console.error('There was an error following the user', error);
    }
  };

  const fetchNotifications = async () => {
    setShowNotifications(!showNotifications); // Toggle dropdown visibility
    if (showNotifications) return; // If already showing, don't fetch again
    try {
      const response = await fetch('http://localhost:3000/blog/notifications_user', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.notifications);
        setNotifications(data.notifications);
      } else {
        console.error('Failed to fetch notifications');
        // If fetching fails, you might want to set showNotifications back to true
        // or handle the error in a different way based on your UI requirements.
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Handle the error gracefully if needed
    }
  };

  const toggleCommentsForPost = (postTitle) => {
    if (showCommentsForPost === postTitle) {
      // If comments are already shown for this post, hide them
      setShowCommentsForPost(null);
    } else {
      // Show comments for the selected post
      setShowCommentsForPost(postTitle);
    }
  };

  const sendInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/blog/submitInput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addsomething }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('There was an error following the user', error);
    }
  }

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="blog-container">
      <div className="notification-bell" onClick={fetchNotifications}>
        <Link to="/viewuserblogs" className="user-button">
          <img src="../public/user.png" alt="User" className="user-image" />
        </Link>
        <h2>Blog Page </h2>
        <img src="../public/notification-bell.png" alt="Notifications" className='user-button' />
        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
        {showNotifications && (
          <div className="notifications-dropdown">
            {notifications.map((notification, index) => (
              <div key={index}>{notification}</div>
            ))}
          </div>
        )}
      </div>
      <div>
        <input type='text'
          value={
            addsomething
          }
          onChange={(e) => setaddsomething(e.target.value)}
        ></input>
        <button onClick={sendInfo} className='DoSmall'
        >
          Click me
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="sorting-buttons">
        <button onClick={handleSortByDate}>Sort by Date</button>
        <button onClick={handleSortByTitle}
          style={{ marginLeft: '10px' }}
        >Sort by Title</button>
        <Link to="/followingfeed" className="user-button"
          style={{ marginLeft: '330px' }}
        >
          <img src="../public/influencer.gif" alt="User" className="user-image" style={
            {
              width: '70px',
              height: '70px',
              borderRadius: '50%',
            }

          } />
        </Link>

      </div>
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((blog, index) => (
            <div key={index} className="blog-post">
              {blog.isFollowing ? (
                <button disabled>Following</button>
              ) : (
                <button onClick={() => handleFollowUser(blog.author, blog.title)}>Follow</button>
              )}
              <h2>{blog.title}</h2>
              <p className="black-text">{blog.content}</p>
              <div className="blog-footer">
                <span>Author: {blog.author}</span>
                <span>Date: {blog.date}</span>
              </div>
              <select
                // value={ratingValue}
                onChange={(e) => setRatingValue(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <h4>Average Rating: {blog.avgrating ? blog.avgrating.toFixed(2) : 'Not rated'}</h4>
              <input
                type="text"
                placeholder="Add a comment..."
                // value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ width: '97%' }}
              />
              <button onClick={() => toggleCommentsForPost(blog.title)}>
                {showCommentsForPost === blog.title ? 'Hide Comments' : 'Show Comments'}
              </button>

              {/* Display comments only if showCommentsForPost matches the current post title */}
              {showCommentsForPost === blog.title && (
                <div className="black-text">
                  {blog.comment.map((comment, index) => (
                    <div key={index} className="comment">{comment}</div>
                  ))}
                </div>
              )}
              {/* Add Rating and Comment buttons */}
              <button onClick={() => handleAddRating(blog.title, ratingValue)}>Add Rating</button>
              <button onClick={() => handleAddComment(blog.title, commentText)}>Add Comment</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {blogs.map((blog, index) => (
            <div key={index} className="blog-post">
              {blog.isFollowing ? (
                <button disabled>Following</button>
              ) : (
                <button onClick={() => handleFollowUser(blog.author, blog.title)}>Follow</button>
              )}
              <h2>{blog.title}</h2>
              <p className="black-text">{blog.content}</p>
              <div className="blog-footer">
                <span>Author: {blog.author}</span>
                <span>Date: {blog.date}</span>
              </div>
              <select
                // value={ratingValue}
                onChange={(e) => setRatingValue(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <h4 className='black-text'>Average Rating: {blog.avgrating ? blog.avgrating.toFixed(2) : 'Not rated'}</h4>
              <input
                type="text"
                placeholder="Add a comment..."
                // value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ width: '97%' }}
              />
              <button onClick={() => toggleCommentsForPost(blog.title)}>
                {showCommentsForPost === blog.title ? 'Hide Comments' : 'Show Comments'}
              </button>

              {/* Display comments only if showCommentsForPost matches the current post title */}
              {showCommentsForPost === blog.title && (
                <div className="black-text">
                  {blog.comment.map((comment, index) => (
                    <div key={index} className="comment">{comment}</div>
                  ))}
                </div>
              )}
              <button onClick={() => handleAddRating(blog.title, ratingValue)}>Add Rating</button>
              <button onClick={() => handleAddComment(blog.title, commentText)}>Add Comment</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/createblog" className="user-button">
        <img src="../public/plus.png" alt="User" className="user-image"
          style={{
            position: 'fixed', top: '871px', right: '67px', width: '50px', height: '50px'
          }}
        />
      </Link>
      <div className="pagination">{renderPageNumbers()}</div>
    </div>

  );
}

export default BlogPage;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminBlogs from './AdminBlogs.jsx'
import AdminLogin from './AdminLogin.jsx'
import BlogPage from './BlogPage.jsx'
import CreateBlog from './CreateBlog.jsx'
import FollowingFeed from './FollowingFeed.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import SignupAdmin from './SignupAdmin.jsx'
import UpdateBlog from './UpdateBlog.jsx'
import UpdateUser from './UpdateUser.jsx'
import ViewUserBlogs from './ViewUserBlogs.jsx'
import ViewUser from './ViewUser.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/updateblog" element={<UpdateBlog />} />
        <Route path="/viewuserblogs" element={<ViewUserBlogs />} />
        <Route path="/followingfeed" element={<FollowingFeed />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/signupadmin" element={<SignupAdmin />} />
        <Route path="/adminblogs" element={<AdminBlogs />} />
        <Route path="/viewuser" element={<ViewUser />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
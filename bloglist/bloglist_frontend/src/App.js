import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { setNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";

import { allUserInfo, loginUser, setUser } from "./reducers/userReducer";

import { Routes, Route, Link, useMatch } from "react-router-dom";
import User from "./components/User";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";
import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Box,
} from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(allUserInfo());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const user = useSelector(({ users }) => {
    return users;
  });

  // check if local storage contains user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const userById = (id) => user.allUser.find((u) => u.id === id);
  const blogById = (id) => blogs.find((b) => b.id === id);

  const matchUserId = useMatch("/users/:id");

  const userInfo = matchUserId ? userById(matchUserId.params.id) : null;

  const matchBlogId = useMatch("/blogs/:id");

  const blogInfo = matchBlogId ? blogById(matchBlogId.params.id) : null;

  // Login user
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      dispatch(loginUser(user));
      dispatch(
        setNotification({
          message: "Successfully",
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          type: "error",
        })
      );
    }
  };

  const Login = () => (
    <div>
      {user.loggedInUser.username} logged in
      <button
        onClick={() => {
          localStorage.removeItem("loggedBlogappUser");
          dispatch(setUser(null));
        }}
      >
        logout
      </button>
      <br />
    </div>
  );

  const showBlogs = () => (
    <div>
      <BlogForm createBlog={addBlog} />
      <Paper sx={{ marginTop: 3, width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog, index) => {
                const isEvenRow = index % 2 === 0;
                const rowColor = isEvenRow ? "white" : "lightpink";
                return (
                  <TableRow key={blog.id} sx={{ backgroundColor: rowColor }}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>
                        <Blog key={blog.id} blog={blog} />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );

  const addBlog = async (blogObject) => {
    console.log(blogObject);
    dispatch(createBlog(blogObject));
  };

  const likePost = async (blog) => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div class="container">
      <Notification />
      {!user.loggedInUser ? (
        <Togglable buttonLabel="Login">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <Menu props={<Login />} />
          <h2>Blog App</h2>
          {/* Routes to different pages*/}
          <Routes>
            <Route path="/" element={showBlogs()} />
            <Route
              path="/users"
              element={user.allUser !== null && <User users={user.allUser} />}
            />
            <Route path="/users/:id" element={<UserInfo info={userInfo} />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogInfo
                  info={blogInfo}
                  user={user}
                  likePost={likePost}
                  removeBlog={removeBlog}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

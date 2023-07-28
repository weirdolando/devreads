/* eslint-disable */
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Blogs from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Navigation from "./components/Navigation";

import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";

import { getUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  // Get all blogs from server
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Get all users from server
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  // Get user data from localStorage if there's one
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const theme = {
    colors: {
      white: "#fff",
      lightblue: "#8ecae6",
      blue: "#023047",
      purple: "#219ebc", //cyan
      yellow: "#e9c46a",
      red: "#FF6F63",
      black: "#0B091A",
      green: "#02B752",
      orange: "#fb8500",
      red: "#ef233c",
    },
  };

  if (user === null) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Notification />
          <LoginForm />
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Navigation user={user} />
        <Notification />
        <Container>
          <h1>DevReads 📖</h1>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="Create New Article" ref={blogFormRef}>
                    <NewBlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <Blogs user={user} blogs={blogs} />
                </>
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<UserDetails users={users} />} />
            <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect } from 'react'
import blogService from './services/blogs';
import './App.css';
import { setInitialBlogs } from './reducers/blogs';
import { setUser } from './reducers/loggedInUser';
import { setSuccessMessage, setErrorMessage } from './reducers/notifications';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog'
import Notification from './components/Notification';

const App = () => {
  const blogs = useSelector( state => state.blogs );
  const user = useSelector( state => state.loggedInUser );

  const dispatch = useDispatch();

  let sortedBlogs = [...blogs];
  sortedBlogs.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }

    if (b.likes < a.likes) {
      return -1;
    }

    return 0;
  });

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setInitialBlogs(blogs));
    })}, []);

  const setUserOnLogin = (user) => {
    dispatch(setUser(user));
  }

  const logout = () => {
    window.localStorage.removeItem('user');
    dispatch(setSuccessMessage(null));
    dispatch(setErrorMessage(null));
    setUserOnLogin(null);
  }

  const onCreateBlogSuccess = () => {
    blogService.getAll().then(blogs =>
      dispatch(setInitialBlogs(blogs))
    );
  }

  const setSuccessMessageInStore = (successMessage) => {
    dispatch(setSuccessMessage(successMessage));
  }

  const setErrorMessageInStore = (errorMessage) => {
    dispatch(setErrorMessage(errorMessage));
  }

  console.log('sorted blogs', sortedBlogs);

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>

      {!user && <LoginForm user={user} onLogin={setUserOnLogin} setSuccessMessage={setSuccessMessageInStore} setErrorMessage={setErrorMessageInStore} />}

      {user && <div>
        <div>{user.name} logged in <button onClick={logout}>logout</button></div>
        <br />
        <BlogForm user={user} setSuccessMessage={setSuccessMessageInStore} setErrorMessage={setErrorMessageInStore} onSuccess={onCreateBlogSuccess}/>
        <br />
        {sortedBlogs.sort(blog => blog.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>}
    </div>
  )
}

export default App
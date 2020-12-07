import React, { useState } from 'react';
import PropTypes from 'prop-types'
import blogService from '../services/blogs';
import { deleteBlog, updateBlogLikes } from '../reducers/blogs';
import { useDispatch } from 'react-redux';

const Blog = ({ blog, user, likeHandler }) => {

  const dispatch = useDispatch();
  const [showDetails, setDetailsVisibility] = useState(false);

  const handleToggleViewDetails = () => {
    setDetailsVisibility(!showDetails);
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const payload = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const callback = () => {
      dispatch(updateBlogLikes(blog.id));
    };
    blogService.update(blog.id, payload, callback);
    if(likeHandler) likeHandler();
  }

  const handleRemove = () => {
    const shouldDelete = window.confirm(`Remove ${blog.title}?`);
    if(shouldDelete){
      const callback = () => {
        dispatch(deleteBlog(blog.id));
      };
      blogService.remove(blog.id, user, callback);
    }
  }

  return <div style={blogStyle} id={blog.url} data-blogid={blog.id} className="blog">
    <div className="heading">{blog.title} {blog.author} <button onClick={handleToggleViewDetails} className="view">view</button> </div>
    {showDetails && <div>
      <p className="url">{blog.url}</p>
      <p className="likes">Likes: {blog.likes} <button onClick={handleLike} className="like">like</button></p>
      <p>{blog.author}</p>
      <button onClick={handleRemove} className="remove">Remove</button>
    </div>}
  </div>
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog;

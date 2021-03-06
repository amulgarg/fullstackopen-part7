import React from 'react';
import PropTypes from 'prop-types'
import blogService from '../services/blogs';
import { updateBlogComments, updateBlogLikes } from '../reducers/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Blog = ({ likeHandler }) => {

  const dispatch = useDispatch();
  const blogId = useParams().blogId;
  const blog = useSelector( state => {
    console.log(blogId, state.blogs);
    const foundBlog = state.blogs.find(blog => blog.id === blogId);
    return { ...foundBlog };
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    marginTop: 5
  }

  const handleLike = () => {
    const payload = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const callback = () => {
      dispatch(updateBlogLikes(blog.id));
    };
    blogService.update(blog.id, payload, callback);
    if(likeHandler) likeHandler();
  }

  /* const handleRemove = () => {
    const shouldDelete = window.confirm(`Remove ${blog.title}?`);
    if(shouldDelete){
      const callback = () => {
        dispatch(deleteBlog(blog.id));
      };
      blogService.remove(blog.id, user, callback);
    }
  } */

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...blog, comments: blog.comments.concat({ text: event.target.comment.value }) , user: blog.user.id };

    const callback = () => {
      dispatch(updateBlogComments(blog.id, blog.comments.concat({ text: event.target.comment.value })));
    };

    blogService.createComment(blog.id, payload, callback);
  }

  console.log('rendering Blog');

  return <div style={blogStyle} id={blog.url} data-blogid={blog.id} className="blog">
    <h1 className="heading">{blog.title}</h1>
    <div>
      <div className="url"><a href={blog.url}>{blog.url}</a></div>
      <p className="likes">Likes: {blog.likes} <button onClick={handleLike} className="like">like</button></p>
      <p>Added by: {blog.author}</p>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment"/> <button type="submit" id="submit-blog-form">Add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? <div>
        <ul>{blog.comments.map( (comment, index) => <li key={index}>{comment.text}</li>)}</ul>
      </div> : null}
    </div>
  </div>
};

Blog.propTypes = {
  //blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog;

import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ user, setSuccessMessage, setErrorMessage, onSubmitHandler, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [visible, setVisibility] = useState(false);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const onAuthorChange = (event) => {
    setAuthor(event.target.value);
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = async (event) => {
    if(onSubmitHandler){
      onSubmitHandler({ title, author, url });
      return;
    }
    event.preventDefault();
    try{
      const newBlog = await blogService.create({ title, author, url }, user);
      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`);
      onSuccess();
    }catch(error){
      setErrorMessage(error);
    }finally{
      setVisibility(false);
    }
  }

  const handleCreateNote = () => {
    setVisibility(true);
  }

  if(!visible){
    return <button onClick={handleCreateNote} className="create">Create new blog</button>
  }

  return <div>
    <h3>Create New</h3>
    <form onSubmit={handleSubmit}>
      <div>title: <input type="text" value={title} onChange={onTitleChange} id="title"/></div>
      <div>author: <input type="text" value={author} onChange={onAuthorChange} id="author"/></div>
      <div>url: <input type="text" value={url} onChange={onUrlChange} id="url"/></div>
      <button type="submit" id="submit-blog-form">Create</button>
    </form>
  </div>
};

export default BlogForm;
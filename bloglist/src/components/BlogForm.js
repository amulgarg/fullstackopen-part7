import React, { useState } from 'react';
import blogService from '../services/blogs';
import { Button, Form } from 'react-bootstrap';

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
    return <Button variant="primary" onClick={handleCreateNote} style={{
      position: 'absolute',
      top: '70px',
      right: '20px'
    }}>Create new blog</Button>
  }

  return <div>
    <h3>Create New</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" value={title} onChange={onTitleChange} id="title"/>
        <Form.Label>Author:</Form.Label>
        <Form.Control type="text" value={author} onChange={onAuthorChange} id="author"/>
        <Form.Label>URL:</Form.Label>
        <Form.Control type="text" value={url} onChange={onUrlChange} id="url"/>
        <Button variant='primary' type="submit" id="submit-blog-form">Create</Button>
      </Form.Group>
    </Form>
  </div>
};

export default BlogForm;
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

//import { prettyDOM } from '@testing-library/dom'

describe('<BlogForm/>', () => {
  let component;
  let mockSubmitHandler = jest.fn();
  beforeEach(() => {
    const user = { id: 'test_user_id' };
    component = render(
      <BlogForm user={user} setErrorMessage={() => {}} setSuccessMessage={() => {}} onSubmitHandler={mockSubmitHandler}/>
    );
  });

  test('BlogForm calls handler on create', () => {
    const createButton = component.container.querySelector('.create');
    fireEvent.click(createButton);

    const form = component.container.querySelector('form');
    const titleInput = component.container.querySelector('#title');
    fireEvent.change(titleInput, {
      target: { value: 'new blog title' }
    });

    const authorInput = component.container.querySelector('#author');
    fireEvent.change(authorInput, {
      target: { value: 'new blog author' }
    });

    const urlInput = component.container.querySelector('#url');
    fireEvent.change(urlInput, {
      target: { value: 'new blog url' }
    });

    fireEvent.submit(form);

    expect(mockSubmitHandler.mock.calls[0][0].title).toBe('new blog title');
    expect(mockSubmitHandler.mock.calls[0][0].author).toBe('new blog author');
    expect(mockSubmitHandler.mock.calls[0][0].url).toBe('new blog url');

  });

});
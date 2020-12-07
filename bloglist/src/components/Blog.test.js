import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

//import { prettyDOM } from '@testing-library/dom'

describe('<Blog/>', () => {
  let component;
  let blog;
  let mockHandler;

  beforeEach(() => {
    blog = {
      author: 'Blog Author',
      id: '5fa4d058af798015022750sa',
      likes: 100,
      title: 'Blog Title',
      url: 'https://blog.com',
      user: {
        id: '5fa4d058af798015022750sa'
      }
    }

    mockHandler = jest.fn();

    component = render(
      <Blog blog={blog} user={{ id: 'test' }} likeHandler={mockHandler}/>
    )

  });

  test('renders blog title and author', () => {
    const elementToCheck = component.container.querySelector('.heading');

    expect(elementToCheck).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
  })

  test('renders blog url and likes after clicking view', () => {
    const viewButton = component.container.querySelector('.view');
    fireEvent.click(viewButton);

    const urlElement = component.container.querySelector('.url');
    expect(urlElement).toHaveTextContent(blog.url);

    const likesElement = component.container.querySelector('.likes');
    //console.log(prettyDOM(likesElement));
    expect(likesElement).toHaveTextContent(`Likes: ${blog.likes}`);
  })

  test('renders blog url and likes after clicking view', () => {
    const viewButton = component.container.querySelector('.view');
    fireEvent.click(viewButton);

    const likeButton = component.container.querySelector('.like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  })
});
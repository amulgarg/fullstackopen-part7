/* eslint-disable indent */
const initialState = [];

const blogsReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_INIT_BLOGS':
      return action.blogs;
    case 'DELETE_BLOG':
      return state.filter( blog => blog.id !== action.blogId );
    case 'UPDATE_BLOG_LIKES':
        // eslint-disable-next-line no-case-declarations
        const updatedBlog = state.find( blog => blog.id === action.blogId );
        updatedBlog.likes = updatedBlog.likes + 1;
        return state.map( blog => {
          if(blog.id === action.blogId)
            return updatedBlog;
          return blog;
        });
    default:
      return state;
  }
}

export const setInitialBlogs = (blogs) => {
  return {
    type: 'SET_INIT_BLOGS',
    blogs
  }
}

export const deleteBlog = (blogId) => {
  return {
    type: 'DELETE_BLOG',
    blogId
  }
}

export const updateBlogLikes = (blogId) => {
  return {
    type: 'UPDATE_BLOG_LIKES',
    blogId
  }
}

export default blogsReducer;
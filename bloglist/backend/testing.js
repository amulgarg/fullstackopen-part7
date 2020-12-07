const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/seed-blogs', async (request, response) => {
  const sampleBlogs = [
    {
      title: "test blog 1",
      author: "test author 1",
      url: "https://example.com/blog1",
      likes: 250
    },
    {
      title: "test blog 2",
      author: "test author 2",
      url: "https://example.com/blog2",
      likes: 100
    },
    {
      title: "test blog 3",
      author: "test author 3",
      url: "https://example.com/blog3",
      likes: 200
    }
  ];

  const user = await User.findOne({ username: request.query.username });
  const newBlogs = sampleBlogs.map(blog => new Blog({
		...blog,
		user: user._id
	}));

  const promiseArray = newBlogs.map(blog => blog.save());
  const allBlogs = await Promise.all(promiseArray);
  user.blogs = allBlogs.map(blog => blog._id);
  await user.save();

  response.status(200).json({ blogs: allBlogs });
});

module.exports = router
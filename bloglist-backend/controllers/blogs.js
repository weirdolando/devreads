const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const blog = new Blog({
    ...request.body,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const blogToReturn = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(blogToReturn);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete.id) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response
      .status(401)
      .json({ error: "only the creator can delete the blog" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    context: "query",
  }).populate("user", { username: 1, name: 1 });

  response.json(updatedBlog);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog.comments);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const newComment = request.body.comment;
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(newComment);
  const savedBlog = await blog.save();
  const blogToReturn = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(blogToReturn.comments);
});

module.exports = blogsRouter;

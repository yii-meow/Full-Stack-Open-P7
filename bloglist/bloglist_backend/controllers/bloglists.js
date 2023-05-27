const bloglistsRouter = require("express").Router();
const Bloglist = require("../models/bloglist");
const userExtractor = require("../utils/middleware").userExtractor;

bloglistsRouter.get("/", async (request, response) => {
  const blogs = await Bloglist.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

bloglistsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  if (
    body.title === undefined ||
    body.author === undefined ||
    body.url === undefined
  ) {
    return response.status(400).json({
      error: "Missing info",
    });
  }

  const user = request.user;

  const blog = new Bloglist({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes || 0,
    comments: [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

bloglistsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blogId = request.params.id;

  const updatedBlog = await Bloglist.findByIdAndUpdate(
    blogId,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );

  response.status(204).json(updatedBlog);
});

bloglistsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;

  if (blogId === undefined) {
    return response.status(400).json({
      error: "Missing id",
    });
  }

  const user = request.user;

  const blogToDelete = await Bloglist.findById(blogId);

  if (!blogToDelete) {
    return response.status(400).json({
      error: "Invalid id",
    });
  }

  const userOfBlog = blogToDelete.user._id.toString();

  if (user.id === userOfBlog) {
    await Bloglist.findByIdAndRemove(blogId);
  } else {
    return response.status(401).json({
      error: "You are not the owner!",
    });
  }

  response.status(204).end();
});

bloglistsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  console.log(request.body);
  const blogId = request.params.id;

  if (comment != null) {
    try {
      const blog = await Bloglist.findById(blogId);

      if (!blog) {
        return response.status(404).json({
          error: "Blog not found",
        });
      }

      blog.comments.push(comment);
      await blog.save();

      return response.status(200).json({
        message: "Comment added successfully!",
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }
});

module.exports = bloglistsRouter;

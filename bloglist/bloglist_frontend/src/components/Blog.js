const Blog = ({ blog }) => {
  return (
    <div>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
      </div>
    </div>
  );
};

export default Blog;

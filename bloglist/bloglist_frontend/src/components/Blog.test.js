import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

describe("<Blog/>", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "this is a title",
      author: "meowmeow author",
      url: "meowmeow",
      user: {
        username: "temp",
        id: "643520af76e0a8f3f36d8024",
      },
      likes: 0,
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("renders content doesnt show url and likes at first", async () => {
    // Title, and author has shown
    const title = screen.getByText("this is a title", { exact: false });
    expect(title).toBeDefined();

    const author = screen.getByText("meowmeow author", { exact: false });
    expect(author).toBeDefined();

    // Url & Likes are not shown at first
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("toggle shows url and likes", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("like button is clicked twice", async () => {
    const blog = {
      title: "this is a title",
      author: "meowmeow author",
      url: "meowmeow",
      user: {
        username: "temp",
        id: "643520af76e0a8f3f36d8024",
      },
      likes: 0,
    };

    const likePost = jest.fn();
    const user = userEvent.setup();

    const div = render(<Blog blog={blog} likePost={likePost} />).container;

    const likeButton = screen.getAllByText("like")[1];

    // Like 2 times
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likePost.mock.calls).toHaveLength(2);
  });

  test("create new blog", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const div = render(<BlogForm createBlog={createBlog} />).container;

    const titleInput = screen.getByPlaceholderText("write title");
    const authorInput = screen.getByPlaceholderText("write author");
    const urlInput = screen.getByPlaceholderText("write url");
    const createBlogButton = screen.getByText("Create");

    // fill in the inputs
    await user.type(titleInput, "new title");
    await user.type(authorInput, "new author");
    await user.type(urlInput, "new url");

    await user.click(createBlogButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "new title",
      author: "new author",
      url: "new url",
    });
  });
});

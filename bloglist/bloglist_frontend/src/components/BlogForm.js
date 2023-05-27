import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import Togglable from "./Togglable";
import { Box, TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    console.log("blog form");
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    dispatch(
      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: "success",
      })
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <Togglable buttonLabel="Create New">
        <form onSubmit={addBlog}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <div>
              <TextField
                required
                id="outline-required"
                label="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <TextField
                required
                id="outline-required"
                label="Author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id="outline-required"
                label="Url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </Box>

          <Button variant="contained" id="create-button" type="submit">
            Create
          </Button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;

import Togglable from "./Togglable";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogInfo = ({ info, user, likePost, removeBlog }) => {
  const [comment, setComment] = useState("");

  const handleForm = async (event) => {
    await blogService.commentPost(info.id, comment);
  };

  if (!info) {
    return null;
  }

  return (
    <div className="more-details">
      <h2>{info.title}</h2>
      <div>
        <a href="">{info.url}</a>
      </div>
      likes {info.likes}
      <button id="like-button" onClick={() => likePost(info)}>
        like
      </button>
      <br />
      added by {info.user.username}
      {user.loggedInUser.username &&
        info.user.username === user.loggedInUser.username && (
          <button id="remove-button" onClick={() => removeBlog(info)}>
            remove
          </button>
        )}
      <h3>comments</h3>
      <Togglable buttonLabel="add comment">
        <form onSubmit={handleForm}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <input type="submit" value="add comment" />
        </form>
      </Togglable>
      {info.comments.map((c) => (
        <li>{c}</li>
      ))}
    </div>
  );
};

export default BlogInfo;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

import { StyledInput } from "./styles/Input.styled";
import { Button } from "./styles/Button.styled";

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url, likes: 0 }));
    blogFormRef.current.toggleVisibility();
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <StyledInput
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </label>
        <label>
          <p>Author</p>
          <StyledInput
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </label>
        <label>
          <p>URL</p>
          <StyledInput
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </label>
        <Button id="create-button" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default NewBlogForm;

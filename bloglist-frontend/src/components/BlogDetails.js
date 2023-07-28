import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeABlog, removeABlog, addComment } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

import { Button } from "./styles/Button.styled";
import { StyledInput } from "./styles/Input.styled";
import { Flex } from "./styles/Flex.styled";

const BlogDetails = ({ blogs }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);
  if (!blog) return null;

  // Check if the blog creator exists and the logged in user is the same as the blog creator
  const own = blog.user && user.username === blog.user.username;

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <Flex>
        <span>{blog.likes} Likes </span>
        <Button id="like-button" onClick={() => dispatch(likeABlog(blog.id))}>
          Like
        </Button>
      </Flex>
      <Flex>
        <span>Added By: {addedBy}</span>
        {own && (
          <Button
            id="remove-button"
            onClick={() => dispatch(removeABlog(blog.id))}
          >
            Remove
          </Button>
        )}
      </Flex>
      <h3>comments</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <Flex>
            <StyledInput
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button>Add Comment</Button>
          </Flex>
        </form>
      </div>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;

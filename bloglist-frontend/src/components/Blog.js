import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Box } from "./styles/Box.styled";
import { Grid } from "./styles/Grid.styled";

const Author = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;

const Blog = ({ blog, user }) => {
  // const style = {
  //   padding: 3,
  //   margin: 5,
  //   borderStyle: "solid",
  //   borderWidth: 1,
  // };

  return (
    <Box>
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
        <Author>{blog.author}</Author>
      </Link>
    </Box>
  );
};

const Blogs = ({ user, blogs }) => {
  return (
    <Grid>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </Grid>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     likes: PropTypes.number.isRequired,
//     user: PropTypes.shape({
//       username: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//   }),
//   likeBlog: PropTypes.func.isRequired,
//   removeBlog: PropTypes.func.isRequired,
// };

export default Blogs;

import { useParams } from "react-router-dom";

const UserDetails = ({ users }) => {
  const userId = useParams().id;
  const user = users.find((user) => user.id === userId);
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;

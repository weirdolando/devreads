import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

import { StyledInput } from "./styles/Input.styled";
import { Button } from "./styles/Button.styled";
import { Container } from "./styles/Container.styled";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <Container>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <StyledInput
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </label>
          <label>
            <p>Password</p>
            <StyledInput
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </label>
          <Button id="login-button" type="submit">
            Log In
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;

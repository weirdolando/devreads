import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

import styled from "styled-components";
import { StyledNav } from "./styles/Navigation.styled";
import { Button } from "./styles/Button.styled";

const TextLogo = styled.span`
  color: #03045e;
  font-size: 1.2rem;
`;

const Navigation = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <StyledNav>
      <TextLogo>DevReads</TextLogo>
      <Link to="/">feeds</Link>
      <Link to="/users">users</Link>
      <div>
        <UserName>{user.name} logged in </UserName>
        <Button
          bg={({ theme }) => theme.colors.red}
          onClick={() => dispatch(logoutUser())}
        >
          Log Out
        </Button>
      </div>
    </StyledNav>
  );
};

const UserName = styled.span`
  margin-right: 10px;
`;

export default Navigation;

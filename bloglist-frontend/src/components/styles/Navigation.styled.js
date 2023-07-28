import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 50px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  font-weight: 700;

  & > div {
    margin-left: auto;
    font-size: 0.8rem;
  }
`;

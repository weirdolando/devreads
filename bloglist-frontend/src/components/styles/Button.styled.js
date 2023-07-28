import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 20px;
  padding: 5px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, bg }) => bg || theme.colors.yellow};
    color: ${({ theme }) => theme.colors.white};
    transition: 0.2s ease;
  }
`;

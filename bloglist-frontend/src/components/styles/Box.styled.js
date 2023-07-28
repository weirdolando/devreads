import styled from "styled-components";

export const Box = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.yellow};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 15px;

  & thead {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }

  &,
  th,
  td {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

import { createGlobalStyle } from "styled-components";
import Pattern from "../../assets/topography.svg";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    background-color: ${({ theme }) => theme.colors.lightblue};
    color: ${({ theme }) => theme.colors.blue};
    background-image: url(${Pattern});
  }

  a {
    text-decoration: none;
    color: inherit;
    opacity: .75;
  }

  /* a:visited {
    color: ${({ theme }) => theme.colors.blue};
  } */

  a:hover {
    color: ${({ theme }) => theme.colors.blue};
    opacity: 1;
    transition: 0.2s ease;
  }

  label {
    margin-top: -10px;
    margin-bottom: 15px;
    display: block;
  }

  button, input {
    font-family: inherit;
  }

  label > p {
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: -10px;
  }

  #create-button {
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.green};
  }

  #like-button {
    background-color: ${({ theme }) => theme.colors.blue};
  }

  #remove-button {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;

export default GlobalStyles;

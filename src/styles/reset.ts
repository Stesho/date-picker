import { createGlobalStyle } from 'styled-components';

export const ResetStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    scroll-behavior: smooth;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    color: inherit;
  }
`;

import { createGlobalStyle } from 'styled-components'
import { ITheme } from './theme'

export const lightTheme: ITheme = {
  bg: '#FFFFFF',
  font: '#324861',
  primary: '#EBF6FE',
  secondary: '#F3F0EC',
  active: '#FD925F',
  success: '#d0f0c0',
}

export const darkTheme: ITheme = {
  bg: '#171717',
  font: '#EBF6FE',
  primary: '#EBF6FE',
  secondary: '#1C1C1C',
  active: '#FD925F',
  success: '#123524',
}

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800&display=swap');
  
  *, html, body, #root {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    transition: all 0.375 ease-in-out;
    font-family: "Roboto Slab";
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.font + 25};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: ${props => props.theme.font};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.font};
  }
  ::-moz-selection {
    background: ${props => props.theme.font};
  }
  ::selection {
    background: ${props => props.theme.font};
  }
  html.theming,
  html.theming * {
    transition: all 0.375s ease-in-out;
  }
  html,
  body {
    color: ${props => props.theme.font};
    background-color:  ${props => props.theme.bg};
    -ms-overflow-style: scrollbar;
    scrollbar-width: auto;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 6px;
    display: block;
  }

  // React Toastify Custom Styles
  .Toastify__toast {
    border-radius: 0;
    background-color: ${props => props.theme.bg};
    border: 1px solid ${props => props.theme.font + 75};
  }
  .Toastify__close-button {
    fill: ${props => props.theme.font + 75};
  }
  .Toastify__toast-icon > svg {
    fill: ${props => props.theme.font + 75};
  }
  .Toastify__progress-bar--error,
  .Toastify__progress-bar--success,
  .Toastify__progress-bar--info,
  .Toastify__progress-bar--warning {
    background: ${props => props.theme.font + 25};
  }
`

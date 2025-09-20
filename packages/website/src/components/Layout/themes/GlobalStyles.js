import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  bg: '#FFFFFF',
  font: '#324861',
  primary: '#EBF6FE',
  secondary: '#F3F0EC',
  active: '#FD925F',
  success: '#d0f0c0'
}

export const darkTheme = {
  bg: '#171717',
  font: '#EBF6FE',
  primary: '#EBF6FE',
  secondary: '#1C1C1C',
  active: '#FD925F',
  success: '#123524'
}

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800&display=swap');
  
  *, html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    transition: all 0.375 ease-in-out;
    font-family: "Roboto Slab";
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.font + 25};
  }
  ::-webkit-scrollbar-thumb {
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
`

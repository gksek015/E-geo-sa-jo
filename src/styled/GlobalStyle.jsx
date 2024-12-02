import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
      --button--color: #DDB25C;
      --font--primary--color: #B47B46;
      --font--secondary--color: #666666;
      --background--color: #FFE7B8;
    }

    * {
        box-sizing: border-box;
    } 

    @font-face {
        font-family: 'yg-jalnan';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'yg-jalnan', sans-serif;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;

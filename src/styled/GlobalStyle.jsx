import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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

    @font-face {
font-family: 'yg-jalnan';
src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
font-weight: normal;
font-style: normal;
}
    }

    body {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1.2;
    }
`;

export default GlobalStyle;


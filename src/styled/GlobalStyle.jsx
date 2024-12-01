import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
      //색상,폰트 정의하기
      --green--color: #008000;
      --red--color: #FF0000;
      --border--color: #d3d3d3;
  }

    * {
    box-sizing: border-box;
    }

    body {
        @font-face {
            font-family: 'yg-jalnan';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
    }
`;

export default GlobalStyle;

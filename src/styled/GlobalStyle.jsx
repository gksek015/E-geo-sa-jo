import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1.2;
    }
`;

export default GlobalStyle;


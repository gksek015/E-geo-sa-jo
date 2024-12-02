import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText> </FooterText>
      <FooterImageContainer>
        <FooterImage src="/images/이거사죠.png" />
        <FooterCopyright>ⓒ copyright by 이거사조</FooterCopyright>
      </FooterImageContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 1400px;
  background-color: #e5cc9a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #333;
`;

const FooterImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterImage = styled.img`
  width: 60px; 
  height: 60px;
`;

const FooterCopyright = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: #b47b46;
  text-align: center;
`;

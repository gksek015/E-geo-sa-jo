import React from "react";
import styled from "styled-components";

const teamMembers = [
  { name: "한다영", blog: "https://gksekdud12.tistory.com/" },
  { name: "김지은", blog: "https://zzieni.tistory.com/" },
  { name: "문다슬", blog: "https://velog.io/@mds6425/posts" },
  { name: "박준석", blog: "https://velog.io/@bj9322/posts" },
  { name: "이경민", blog: "https://zzxx66052.tistory.com/" },
  { name: "정은혜", blog: "https://velog.io/@gracejelly125" },
];

export default function Footer() {
  return (
    <FooterContainer>
      <FooterImageContainer>
        <FooterImage src="/images/이거사죠.png" />
        <FooterCopyright>ⓒ copyright by 이거사조</FooterCopyright>
      </FooterImageContainer>

      <FooterInfo>
        <TeamList>
          {teamMembers.map((member, index) => (
            <TeamMember key={index}>
              {member.name} -{" "}
              <BlogLink href={member.blog} target="_blank" rel="noopener noreferrer">
                블로그
              </BlogLink>
            </TeamMember>
          ))}
        </TeamList>
      </FooterInfo>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 1400px;
  background-color: #e5cc9a;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 20px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FooterImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterImage = styled.img`
  width: 60px;
  height: 60px;
`;

const FooterCopyright = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: #b47b46;
  text-align: left;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;

const TeamList = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 15px; 
`;

const TeamMember = styled.div`
  padding-top: 40px;
  font-size: 16px;
  color: #333;
`;

const BlogLink = styled.a`
  font-size: 15px;
  color: #888;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

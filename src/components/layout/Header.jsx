import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabaseClient";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data, error } = await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <HeaderContainer>
        <LogoLink to="/home">
          <HeaderLogo>
            <HeaderImage src="/images/image.png" />
            <HeaderText>붕빵사조!</HeaderText>
          </HeaderLogo>
        </LogoLink>
        <HeaderButtons>
          <Link to="/mypage">
            <StyledButton>마이페이지</StyledButton>
          </Link>
          <Link to="/myprofile">
            <StyledButton>마이프로필</StyledButton>
          </Link>
          <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
        </HeaderButtons>
      </HeaderContainer>
      <HeaderSpacer />
    </>
  );
}

const HeaderContainer = styled.header`
  width: 1400px;
  background-color: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit; 
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px; 
  cursor: pointer; 
`;

const HeaderText = styled.p`
  font-family: 'yg-jalnan';
  color: #B47B46;
  font-size: 28px; 
`;

const HeaderImage = styled.img`
  width: 75px;
  height: 70px;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: var(--button--color);
  color: #ffffff;
  font-weight: 300;
  font-family: 'yg-jalnan';

  &:hover {
    background-color: #b98e38;
  }
`;

const HeaderSpacer = styled.div`
  height: 30px;
  background-color: transparent;
`;

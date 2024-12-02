import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignupComponent = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Nickname:', nickname);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Background>
      <Container>
        <Title>Sign Up</Title>
        <Logo>
          <img src="https://s3-alpha-sig.figma.com/img/873d/1e28/830412d1a5ca6da6045892bc4af2ada2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MYW9wiqETifUcyQ8OHXstL0~oBXy1ZKK4ZiCJqM2pVs43xYjv5RUOoATjC0ho5TKKPO2bIS2ZCvYS-jsUlxmOTU5VQQ5bljd-vjLsn1LC6NO0vbVPWR0obM5DCNo5ObEO6wIxiscMYaU0widTGcQfn9inhel72uczbfyeW3m4fYwUpmJUOeO1Eeg8CI6dDEANWcrXxabrU2FbzU~S9kGIR5y11TEw6VjeUcCSz5IO7G5b9xg1nz8bt58xy9Hve7qTdOPyzGgMBpluHXV3OYqQQa-pRsUlUxx4CxY8nMYNTGwHUyIC4AlusSUY-gewvt9tjSDoZ6wVh85Qrk6RdW0sw__"
          alt="Logo" />
        </Logo>
        <form onSubmit={handleSignup}>
          <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input type='password' placeholder='비밀번호 확인'/>
          <Input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <ButtonGroup> 
            <Button type="submit">회원가입</Button>
            <LinkButton to="/">뒤로가기</LinkButton>
          </ButtonGroup>
        </form>
      </Container>
    </Background>
  );
};

export default SignupComponent;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background--color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 32px;
  background-color: var(--background--color);
  border-radius: 10px;
  text-align: center;
`;

const Logo = styled.div`
  margin: 0 auto;
  width: 142px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #fff;
  margin-bottom: 50px;
  img {
    width: 80%;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  color: var(--font--primary--color);
  margin-bottom: 10px;
`;

const Input = styled.input`
  display: block;
  width: 267px;
  padding: 6px 15px;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  color: var(--font--secondary--color);
  margin: 0 auto 20px;

  &::placeholder {
    color: var(--font--secondary--color);
  }
`;

const Button = styled.button`
  width: 48%;
  padding: 6px;
  margin: 8px 0.5%;
  background-color: var(--button--color);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const LinkButton = styled(Link)`
  width: 48%;
  padding: 6px;
  margin: 8px 0.5%;
  background-color: var(--button--color);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const ButtonGroup = styled.div`
  width: 340px;
  margin: 40px auto 0;
  display: flex;
  justify-content: space-between;
  gap: 35px;
`;

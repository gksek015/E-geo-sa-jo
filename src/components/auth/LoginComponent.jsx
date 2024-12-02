import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../supabase/supabaseClient';
import { toast } from 'react-toastify';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password} = formData;

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log({data})

      if (error) {
        toast.error("로그인에 실패했습니다.")
      }

      if (data.user) {
        toast.success("로그인 성공!");
        navigate("/home");
      } else {
        toast.error("로그인에 실패했습니다.")
      }
    } catch (error) {
      toast.error("알 수 없는 에러가 발생했습니다. 다시 시도해주세요.")
    }
  };

  return (
    <Background>
      <Container>
        <Title>Login</Title>
        <Logo>
          <img
            src="https://s3-alpha-sig.figma.com/img/873d/1e28/830412d1a5ca6da6045892bc4af2ada2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MYW9wiqETifUcyQ8OHXstL0~oBXy1ZKK4ZiCJqM2pVs43xYjv5RUOoATjC0ho5TKKPO2bIS2ZCvYS-jsUlxmOTU5VQQ5bljd-vjLsn1LC6NO0vbVPWR0obM5DCNo5ObEO6wIxiscMYaU0widTGcQfn9inhel72uczbfyeW3m4fYwUpmJUOeO1Eeg8CI6dDEANWcrXxabrU2FbzU~S9kGIR5y11TEw6VjeUcCSz5IO7G5b9xg1nz8bt58xy9Hve7qTdOPyzGgMBpluHXV3OYqQQa-pRsUlUxx4CxY8nMYNTGwHUyIC4AlusSUY-gewvt9tjSDoZ6wVh85Qrk6RdW0sw__"
            alt=""
          />
        </Logo>
        <form onSubmit={handleLogin}>
          <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ButtonGroup>
            <Button type="submit">로그인</Button>
            <LinkButton to="/signup">회원가입</LinkButton>
          </ButtonGroup>
        </form>
      </Container>
    </Background>
  );
};

export default LoginComponent;

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



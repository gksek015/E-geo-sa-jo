import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { logout, signup } from '../../api/authApi';

const SignupComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "올바른 이메일 주소를 입력해주세요.";
        }
        break;
      case "password":
        if (!value) {
          error = "";
        } else if (value.length < 8) {
          error = "비밀번호는 최소 8자 이상이어야 합니다.";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "";
        } else if (value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "nickname":
        if (!value.trim()) {
          error = "";
        } else if (value.trim() === "") {
          error = "닉네임을 입력해주세요.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, nickname } = formData;

    const isFormValid = Object.values(errors).every((error) => error === '') && email && password && confirmPassword && nickname;

    if (!isFormValid) {
      toast.error("모든 필드를 채워주세요.");
      return;
    }

    try {
      await signup(email, password, nickname);
      toast.success('회원가입이 완료되었습니다!');

      await logout();
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Background>
      <Container>
        <Title>Sign Up</Title>
        <Logo>
          <img
            src="https://s3-alpha-sig.figma.com/img/873d/1e28/830412d1a5ca6da6045892bc4af2ada2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MYW9wiqETifUcyQ8OHXstL0~oBXy1ZKK4ZiCJqM2pVs43xYjv5RUOoATjC0ho5TKKPO2bIS2ZCvYS-jsUlxmOTU5VQQ5bljd-vjLsn1LC6NO0vbVPWR0obM5DCNo5ObEO6wIxiscMYaU0widTGcQfn9inhel72uczbfyeW3m4fYwUpmJUOeO1Eeg8CI6dDEANWcrXxabrU2FbzU~S9kGIR5y11TEw6VjeUcCSz5IO7G5b9xg1nz8bt58xy9Hve7qTdOPyzGgMBpluHXV3OYqQQa-pRsUlUxx4CxY8nMYNTGwHUyIC4AlusSUY-gewvt9tjSDoZ6wVh85Qrk6RdW0sw__"
            alt="Logo"
          />
        </Logo>
        <Form onSubmit={handleSignup} noValidate>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {errors.email && <Span>{errors.email}</Span>}
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <Span>{errors.password}</Span>}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <Span>{errors.confirmPassword}</Span>}
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          {errors.nickname && <Span>{errors.nickname}</Span>}
          <ButtonGroup>
            <LinkButton to="/">뒤로가기</LinkButton>
            <Button type="submit">회원가입</Button>
          </ButtonGroup>
        </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  display: block;
  width: 267px;
  padding: 6px 15px;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
  color: var(--font--secondary--color);
  margin: 0 auto 10px;

  &::placeholder {
    color: var(--font--secondary--color);
  }

  &:focus {
    outline: 2px solid var(--font--secondary--color);
    
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
  align-content: center;
`;

const ButtonGroup = styled.div`
  width: 340px;
  margin: 40px auto 0;
  display: flex;
  justify-content: space-between;
  gap: 35px;
`;


const Span = styled.span`
  font-size: 11px;
  color: #E74646;
  display: flex;
  width: 260px;
  margin-bottom: 20px;
`
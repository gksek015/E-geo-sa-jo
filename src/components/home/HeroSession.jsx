import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroSession = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeroContainer>
        <HeroContent>
          <TextContainer>
            <HeroText>추운 겨울 하면 붕어빵이지!</HeroText>
            <HeroText>주변 지역 붕빵집을 다같이 찾아볼까요?</HeroText>
          </TextContainer>
          <ButtonContainer>
            <Button onClick={() => navigate('/post')}>주변 붕빵집 추가하기</Button>
            <Button onClick={() => navigate('/list')}>TOP 10 붕어빵 리스트 </Button>
          </ButtonContainer>
        </HeroContent>
        <Heroimg src="images/고양이포장마차.jpg"></Heroimg>
      </HeroContainer>
    </Container>
  );
};

export default HeroSession;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 20px;
  width: 1400px;
  background-color: #fbfbf9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeroContent = styled.div`
  margin: 30px;
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
`;

const HeroText = styled.p`
  font-size: 36px;
  margin-bottom: 10px;
  padding: 5px;
  color: var(--font--primary--color);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
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

const Heroimg = styled.img`
  border-radius: 10px;
`;

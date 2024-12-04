import React, { useEffect } from 'react';
import { usePostStore } from '../../zustand/usePostStore';
import PostMap from './PostMap';
import supabase from '../../supabase/supabaseClient';
import styled from 'styled-components';
import { getId } from '../../api/authApi';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const Container = styled.div`
  background-color: #ffe7b8;
  width: 80%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Title과 Image 사이 간격 */
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #b47b46;
`;

const StyledImage = styled.img`
  width: 50px; /* 이미지 크기 조정 */
  height: auto;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #704d2c;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #b47b46;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px auto 0 auto;
  &:hover {
    background-color: #704d2c;
  }
`;

const MapWrapper = styled.div`
  width: 48%;
`;

const PostForm = () => {
  const { formData, setFormData, resetForm } = usePostStore();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();
      if (userId) {
        setFormData('user_id', userId);
      }
    };

    fetchUserId();
  }, [setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('stores').insert([formData]);
      if (error) {
        console.error('Supabase 데이터 추가 실패:', error);
        alert('삽입 실패: ' + error.message);
      } else {
        alert('삽입 성공!');
        resetForm();
      }
    } catch (error) {
      console.error('삽입 중 오류 발생:', error);
    }
  };

  // Supabase에 데이터 추가하는 mutation
  // const mutation = useMutation({
  //   mutationFn: addPost, // 수정: mutationFn으로 전달
  //   onSuccess: () => {
  //     alert('포스팅이 성공적으로 저장되었습니다!');
  //     resetForm();
  //   },
  //   onError: (error) => {
  //     console.error('포스팅 저장 중 오류:', error);
  //     alert('저장 실패!');
  //   }
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutation.mutate(formData); // Supabase에 데이터 추가 요청
  // };

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>주변 붕빵집 추가하기</Title>
          <StyledImage src="public/images/fishcake.png" />
        </TitleWrapper>
        <FormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <Label>붕빵집 이름</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData('name', e.target.value)}
              placeholder="붕빵집 이름을 입력붕빵!"
            />

            <Label>주소</Label>
            <Input
              type="text"
              value={formData.map_address}
              readOnly
              placeholder="지도에 표시하면 자동으로 입력되붕 ^0^"
            />

            <Label>가게 등록</Label>
            <Select value={formData.category} onChange={(e) => setFormData('category', e.target.value)}>
              <option value="empty">가게 종류</option>
              <option value="노상">노상</option>
              <option value="카페">카페</option>
              <option value="편의점">편의점</option>
              <option value="기타">기타</option>
            </Select>
            <Label>세부사항</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData('description', e.target.value)}
              placeholder="가게에 특징 등을 남겨달라붕!"
            />

            <Button type="submit">추가하기</Button>
          </StyledForm>
          <MapWrapper>
            <PostMap />
          </MapWrapper>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default PostForm;

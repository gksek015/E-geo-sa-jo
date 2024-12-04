import React, { useEffect } from 'react';
import { usePostStore } from '../../zustand/usePostStore';
import { deletePost, fetchPost, updatePost } from '../../api/postUpdateDeleteApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UpdateMap from './UpdateMap';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const PostUpdateDelete = () => {
  const { formData, setFormData, resetForm } = usePostStore();
  const { id: storeId } = useParams();
  const navigate = useNavigate();

  //스토어 정보 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['stores', storeId],
    queryFn: () => fetchPost(storeId)
  });

  useEffect(() => {
    if (data) {
      setFormData('name', data.name);
      setFormData('map_address', data.map_address);
      setFormData('location', JSON.parse(data.location));
      setFormData('category', data.category);
      setFormData('description', data.description);
    }
  }, [data]);

  // 데이터 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: async (updateData) => await updatePost(updateData, storeId),
    onSuccess: (data) => {
      toast.success('수정 성공! 🎉');
      navigate(`/home/${storeId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error('수정 실패! 😢');
    }
  });

  // 데이터 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(storeId),
    onSuccess: () => {
      toast.success('삭제 성공! 🗑️');
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast.error('삭제 실패! 😢');
    }
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (window.confirm('정말 붕빵집을 삭제하시겠어요...?')) {
      deleteMutation.mutate(storeId);
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>붕빵집 수정하기</Title>
          <StyledImage src="public/images/fishcake.png" />
        </TitleWrapper>
        <FormWrapper>
          <StyledForm onSubmit={handleUpdate}>
            <Label>붕빵집 이름</Label>
            <Input type="text" value={formData.name} onChange={(e) => setFormData('name', e.target.value)} />

            <Label>주소</Label>
            <Input type="text" value={formData.map_address} readOnly />

            <Label>가게 등록</Label>
            <Select value={formData.category} onChange={(e) => setFormData('category', e.target.value)}>
              <option value="empty">가게 종류</option>
              <option value="노상">노상</option>
              <option value="카페">카페</option>
              <option value="편의점">편의점</option>
              <option value="기타">기타</option>
            </Select>

            <Label>세부사항</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData('description', e.target.value)} />
            <ButtonWrapper>
              <UpdateButton type="submit">수정하기</UpdateButton>
              <DeleteButton type="button" onClick={handleDelete}>
                삭제하기
              </DeleteButton>
            </ButtonWrapper>
          </StyledForm>
          <MapWrapper>
            <UpdateMap location={formData.location} />
          </MapWrapper>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default PostUpdateDelete;

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
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #b47b46;
`;

const StyledImage = styled.img`
  width: 50px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼 간격 유지 */
  gap: 10px; /* 버튼 사이의 간격 */
  margin-top: 20px;
`;

const UpdateButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #b47b46; /* 수정하기 버튼 기본 색상 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #704d2c; /* 수정하기 버튼 호버 색상 */
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #bf4745; /* 삭제하기 버튼 기본 색상 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #8f3230; /* 삭제하기 버튼 호버 색상 */
  }
`;

const MapWrapper = styled.div`
  width: 48%;
`;

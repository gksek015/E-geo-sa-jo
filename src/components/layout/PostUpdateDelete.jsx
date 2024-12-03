import React, { useEffect } from 'react';
import { usePostStore } from '../../zustand/usePostStore';
import PostMap from './PostMap';
import { deletePost, fetchPost, updatePost } from '../../api/postUpdateDeleteApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const PostUpdateDelete = ({ storeId }) => {
  const { formData, setFormData, resetForm } = usePostStore();

  //스토어 정보 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['stores', storeId],
    queryFn: () => fetchPost(storeId)
  });

  useEffect(() => {
    if (data) {
      setFormData('name', data.name);
      setFormData('map_address', data.map_address);
      setFormData('location', data.location);
      setFormData('category', data.category);
      setFormData('description', data.description);
    }
  }, [data]);

  // 데이터 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: async (updateData) => await updatePost( updateData),
    onSuccess: (data) => {
      console.log(data);
      toast.success('수정 성공! 🎉');
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
    console.log('전송할 데이터', formData);
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
    <>
      <PostMap />
      <form onSubmit={handleUpdate}>
        <label>
          붕빵집 이름:
          <input type="text" value={formData.name} onChange={(e) => setFormData('name', e.target.value)} />
        </label>

        <label>
          주소:
          <input type="text" value={formData.map_address} readOnly />
        </label>

        {/* <label>
          좌표 정보:
          <input
            type="text"
            value={formData.location ? `${formData.location.lat}, ${formData.location.lng}` : ''}
            readOnly
          />
        </label> */}

        <label>
          가게 등록:
          <select value={formData.category} onChange={(e) => setFormData('category', e.target.value)}>
            <option value="empty">가게 종류</option>
            <option value="노상">노상</option>
            <option value="카페">카페</option>
            <option value="편의점">편의점</option>
            <option value="기타">기타</option>
          </select>
        </label>

        <label>
          세부사항:
          <textarea value={formData.description} onChange={(e) => setFormData('description', e.target.value)} />
        </label>

        <button type="submit">수정하기</button>
        <button type="button" onClick={handleDelete}>
          삭제하기
        </button>
      </form>
    </>
  );
};

export default PostUpdateDelete;

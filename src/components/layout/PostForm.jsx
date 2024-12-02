import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '../../api/postApi';
import { usePostStore } from '../../zustand/usePostStore';
import PostMap from './PostMap';
import { supabase } from '../../supabase/supabaseClient';

const PostForm = () => {
  const { formData, setFormData, resetForm } = usePostStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 임시 user_id 설정
    const tempUserId = '004f4d50-f6c0-45fb-98d0-ca294cc24505'; // SQL에서 추가한 임시 user_id

    const formDataWithUserId = {
      ...formData,
      user_id: tempUserId // user_id 추가
    };

    try {
      const { error } = await supabase.from('stores').insert([formDataWithUserId]);
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
    <>
      <PostMap />
      <form onSubmit={handleSubmit}>
        <label>
          붕빵집 이름:
          <input type="text" value={formData.name} onChange={(e) => setFormData('name', e.target.value)} />
        </label>

        <label>
          주소:
          <input type="text" value={formData.map_address} readOnly />
        </label>

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

        <button type="submit">추가하기</button>
      </form>
    </>
  );
};

export default PostForm;

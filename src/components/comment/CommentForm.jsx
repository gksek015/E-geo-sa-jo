import { useState } from 'react';
import styled from 'styled-components';
import supabase from '../../supabase/supabaseClient';
import { useParams } from 'react-router-dom';
import useStoreData from '../../hooks/useStoreData';

function CommentForm() {
  const { id, tsetId, user } = useStoreData();
  console.log(user);
  const [commentsData, setCommentsData] = useState({});

  const storecomment = async () => {
    const { data, error } = await supabase.from('');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log('댓글작성 버튼 클릭');

    if (!comment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('commensts')
        .insert([
          {
            user_id: '',
            stoer_id: tsetId,
            content: ''
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setCommentsData((prevComments) => [...prevComments, ...data]);
      }
      setCommentValue('');
    } catch (error) {
      console.error('댓글 작성 오류: ', error.message);
    }
  };
  return (
    <>
      <ChatMessageForm onSubmit={handleAddComment}>
        <ChatMessageInput type="text" name="messageInput" placeholder="댓글을 작성해 주세요." />
        <MessageButton type="submit">작성하기</MessageButton>
      </ChatMessageForm>
    </>
  );
}
export default CommentForm;

const ChatMessageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ChatMessageInput = styled.input`
  position: relative;
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  border-width: thin;
`;

const MessageButton = styled.button`
  width: 80px;
  margin-left: auto;
  padding: 5px;
  background-color: #b08968;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
`;

import styled from 'styled-components';
import useCommentsData from '../../hooks/useCommentsData';
import { useCommentStore } from '../../zustand/useCommentStore';
import useAuthStore from '../../zustand/useAuthStore';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function CommentForm() {
  const inputRef = useRef(null);
  const { id } = useParams();
  const { user } = useAuthStore();
  const { commentContent, setCommentContent, addComment } = useCommentStore();

  useEffect(() => {}, []);
  const handleAddComment = (e) => {
    e.preventDefault();
    setCommentContent(inputRef.current.value);
    addComment(user.id, id);
  };

  return (
    <>
      <ChatMessageForm onSubmit={handleAddComment}>
        <ChatMessageInput type="text" name="messageInput" placeholder="댓글을 작성해 주세요." ref={inputRef} />
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

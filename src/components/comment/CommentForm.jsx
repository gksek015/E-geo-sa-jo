import styled from 'styled-components';
import useCommentsData from '../../hooks/useCommentsData';
import { useCommentStore } from '../../zustand/useCommentStore';
import useAuthStore from '../../zustand/useAuthStore';
import { useRef } from 'react';

function CommentForm() {
  // const { handleAddComment, commentContent, setCommentContent } = useCommentsData();
  const inputRef = useRef(null);

  const { user } = useAuthStore();
  console.log(user);
  const { commentContent, setCommentContent, addComment } = useCommentStore();

  const handleAddComment = (e) => {
    e.preventDefault();
    setCommentContent(inputRef.current.value);
    addComment(user.id, user.nick_name, '49aea70d-a279-4717-a328-529adf49d39b');
  };

  const handleCommentInput = (e) => {
    e.preventDefault();
    setCommentContent(e.target.value);
    // useRef 리팩토링 추천 ~ !
  };
  return (
    <>
      <ChatMessageForm onSubmit={handleAddComment}>
        <ChatMessageInput
          type="text"
          name="messageInput"
          placeholder="댓글을 작성해 주세요."
          // value={commentContent}
          // onChange={handleCommentInput}
          ref={inputRef}
        />
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

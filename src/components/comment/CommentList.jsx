import styled from 'styled-components';
import useCommentsData from '../../hooks/useCommentsData';
import { toast } from 'react-toastify';
import useAuthStore from '../../zustand/useAuthStore';
import { useCommentStore } from '../../zustand/useCommentStore';
import { useEffect } from 'react';

function CommentList() {
  const { fetchCommentsData, commentData, deleteComment } = useCommentStore();
  const { user } = useAuthStore();
  console.log(user);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const handleEdit = (comment) => {};

  const handleDelete = (commentId) => {
    console.log(commentId);
    if (toast.success('댓글이 삭제되었습니다.')) {
      deleteComment(commentId);
    }
  };

  return (
    <>
      {commentData.map((comment) => (
        <ChatBox key={comment.id}>
          <MessageHeader>
            <ProfileImage />
            <Username>{comment.user_nick_name}</Username>
          </MessageHeader>
          <ChatMessage>
            <MessageContent>{comment.content}</MessageContent>
          </ChatMessage>
          <MessageActions>
            <ActionButton onClick={() => handleEdit(comment)}>✏️</ActionButton>
            <ActionButton onClick={() => handleDelete(comment.id)}>🗑️</ActionButton>
          </MessageActions>
        </ChatBox>
      ))}
    </>
  );
}

const ChatBox = styled.div`
  margin: 20px;
`;

const MessageHeader = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #b98b73;
  margin-right: 10px;
`;

const Username = styled.span`
  font-weight: bold;
  color: #b98b73;
`;

const ChatMessage = styled.div`
  position: relative;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #b47b46;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 100%;
`;

const MessageContent = styled.p`
  color: #333333;
  font-size: 14px;
  line-height: 1.5;
`;

const MessageActions = styled.div`
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin: 20px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666666;
  padding: 4px;
`;

export default CommentList;

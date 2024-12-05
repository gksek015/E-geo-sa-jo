import styled from 'styled-components';
import { toast } from 'react-toastify';
import useAuthStore from '../../zustand/useAuthStore';
import { useCommentStore } from '../../zustand/useCommentStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CommentList() {
  const { fetchCommentsData, commentData, deleteComment } = useCommentStore();
  const { id } = useParams();

  useEffect(() => {
    fetchCommentsData(id);
  }, []); //commentData

  const handleDelete = (commentId) => {
    if (toast.success('댓글이 삭제되었습니다.')) {
      deleteComment(commentId, id);
    }
  };

  return (
    <>
      <ChatContainer>
        {commentData.map((comment) => (
          <ChatBox key={comment.id}>
            <MessageHeader>
              <ProfileImage src={comment.users.profile_image} alt="유저프로필이미지" />
              <Username>{comment.users.nick_name}</Username>
            </MessageHeader>
            <ChatMessage>
              <MessageContent>{comment.content}</MessageContent>
            </ChatMessage>
            <MessageActions>
              <ActionButton onClick={() => handleDelete(comment.id)}>🗑️</ActionButton>
            </MessageActions>
          </ChatBox>
        ))}
      </ChatContainer>
    </>
  );
}
const ChatContainer = styled.div`
  padding: 20px;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ChatBox = styled.div`
  margin: 20px;ß
`;

const MessageHeader = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfileImage = styled.img`
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

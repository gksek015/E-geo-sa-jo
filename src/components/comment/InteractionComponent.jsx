import styled from 'styled-components';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCommentStore } from '../../zustand/useCommentStore';

import useLikesData from '../../hooks/useLikesData';
import useAuthStore from '../../zustand/useAuthStore';

function InteractionComponent() {
  const { id } = useParams();
  const { likes, isLiked, handleLike, fetchLikes } = useLikesData(id);
  const { fetchCommentsData, commentData } = useCommentStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCommentsData(id);
  }, [user]);

  useEffect(() => {
    fetchLikes();
  }, [user]);

  return (
    <>
      <InteractionContainer>
        <div className="interaction">
          <ActionCommentCounter>💬 {commentData.length}</ActionCommentCounter>
        </div>
        <div className="interaction">
          <ActionButton onClick={handleLike}>{isLiked ? '❤️' : '🤍'}</ActionButton>
          <span>{likes}</span>
        </div>
      </InteractionContainer>
    </>
  );
}

const InteractionContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  height: 50px;
  justify-content: space-between;

  .interaction {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666666;
  padding: 4px;
`;

const ActionCommentCounter = styled.span`
  background: none;
  border: none;
  cursor: pointer;
  color: #666666;
  padding: 4px;
`;
export default InteractionComponent;

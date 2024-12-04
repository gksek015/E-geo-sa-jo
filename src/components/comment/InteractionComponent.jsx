import { useEffect, useState } from 'react';
import useLikesData from '../../hooks/useLikesData';
import useLikesStore from '../../zustand/useLikesStore';
import styled from 'styled-components';
import { useCommentStore } from '../../zustand/useCommentStore';

function InteractionComponent() {
  const { likes, isLiked, handleLike } = useLikesData();
  const { commentCounter } = useCommentStore();
  //   const [commentCounter, StoreCommentCounter] = useState(0);

  //   주스탠드
  //   const { likes, isLiked, fetchLikes, handleLikes } = useLikesStore();

  //   useEffect(() => {
  //     fetchLikes('49aea70d-a279-4717-a328-529adf49d39b');
  //   }, [fetchLikes]);

  //   const handleLike = (e) => {
  //     e.preventDefault();
  //     handleLikes('49aea70d-a279-4717-a328-529adf49d39b');
  //   };

  return (
    <>
      <InteractionContainer>
        <div className="interaction">
          <ActionCommentCounter>💬 {commentCounter}</ActionCommentCounter>
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

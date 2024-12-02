import styled from 'styled-components';
import { useState } from 'react';
import CommentForm from '../components/comment/commentForm';
import CommentList from '../components/comment/CommentList';
import StoreInfo from '../components/store/StoreInfo';

const DetailPage = () => {
  return (
    <StoreDetailContainer>
      <StoreCard>
        <StoreHeader>
          <h1>
            붕빵집 소개
            <img src="/fish-icon.png" alt="붕어빵 아이콘" />
          </h1>
        </StoreHeader>

        <StoreCommentContainer>
          <StoreInfo />
          <CommentContainer>
            <ChatContainer>
              <CommentList />
              <CommentForm />
            </ChatContainer>

            <InteractionContainer>
              <div className="interaction">
                <ActionButton>💬</ActionButton>
                <span>1</span>
              </div>
              <div className="interaction">
                <ActionButton>❤️</ActionButton>
                <span>5</span>
              </div>
            </InteractionContainer>
          </CommentContainer>
        </StoreCommentContainer>
      </StoreCard>
    </StoreDetailContainer>
  );
};

const StoreDetailContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
`;

const StoreCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e8e8e8;
`;

const StoreHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  h1 {
    color: #b08968;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const StoreCommentContainer = styled.div`
  display: flex;
  min-height: 500px;
`;

const CommentContainer = styled.div`
  width: 450px;
  display: flex;
  gap: 20px;
  margin: 20px 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;

  .interaction {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

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

const ChatContainer = styled.div`
  padding: 20px;
  max
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666666;
  padding: 4px;
`;

export default DetailPage;

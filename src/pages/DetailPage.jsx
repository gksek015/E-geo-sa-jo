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

        <Store>
          <StoreInfoContainer>
            <UpdataButton>수정하기</UpdataButton>
            <InputGroup>
              <p>test test</p>e
            </InputGroup>

            <AddressSection>
              <p>test test</p>
              <Button>지도보기</Button>
            </AddressSection>

            <InputGroup>
              <p>test test</p>
            </InputGroup>

            <DescriptionArea placeholder="세부사항 (가게의 특징 등을 남겨주세요!)" />

            <Button>돌아가기</Button>
          </StoreInfoContainer>

          <CommentContainer>
            <ChatContainer>
              <ChatBox>
                <MessageHeader>
                  <ProfileImage />
                  <Username>닉네임</Username>
                </MessageHeader>
                <ChatMessage>
                  <MessageContent>댓글이 나오는 부분입니다.</MessageContent>
                </ChatMessage>
                <MessageActions>
                  <ActionButton>✏️</ActionButton>
                  <ActionButton>🗑️</ActionButton>
                </MessageActions>
              </ChatBox>

              <ChatMessageForm>
                <ChatMessageInput />
                <MessageButton type="submit">작성하기</MessageButton>
              </ChatMessageForm>
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
        </Store>
      </StoreCard>
    </StoreDetailContainer>
  );
};
import styled from 'styled-components';

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
const UpdataButton = styled.button`
  width: 15%;
  padding: 3px;
  background-color: #b08968;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin-left: auto;
  margin-bottom: 10px;
`;
const Store = styled.div`
  display: flex;
  min-height: 500px;
`;

const StoreInfoContainer = styled.div`
  width: 600px;
  height: 350px;
`;

const InputGroup = styled.div`
  background-color: #fff9f0;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #e0c4a3;
    border-radius: 4px;
  }
`;

const AddressSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;
  padding: 15px;
  background-color: #fff9f0;
  p {
    width: calc(100% - 110px);
  }
  button {
    width: 100px;
    padding: 5px 15px;
  }
`;

const DescriptionArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 15px;
  background-color: #fff9f0;
  border: none;
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: #b08968;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin: 0 auto;
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
`;

const ChatBox = styled.div`
  margin: 20px;
`;

const ChatMessage = styled.div`
  position: relative;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #b47b46;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 100%;
`;

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

const MessageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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

const MessageContent = styled.div`
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

export default DetailPage;

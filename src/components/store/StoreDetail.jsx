import styled from 'styled-components';

const StoreDetail = ({ store }) => {
  const handleStoreUpdata = (e) => {
    e.preventDefault();
    console.log('수정하기 ');
  };
  return (
    <>
      <UpdataButton onClick={handleStoreUpdata}>수정하기</UpdataButton>
      <InputGroup>
        <p>{store.name}</p>
      </InputGroup>
      <AddressSection>
        <p>{store.map_address}</p>
        <Button>지도보기</Button>
      </AddressSection>
      <InputGroup>
        <p>{store.category}</p>
      </InputGroup>
      <DescriptionArea>{store.description}</DescriptionArea>
      <Button>돌아가기</Button>
    </>
  );
};
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

const DescriptionArea = styled.p`
  width: 100%;
  min-height: 150px;
  padding: 15px;
  background-color: #fff9f0;
  border: none;
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
`;

export default StoreDetail;

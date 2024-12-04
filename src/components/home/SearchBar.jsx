import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { toast } from 'react-toastify';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('검색어를 입력해 주세요');
      return;
    }
    onSearch(searchTerm.trim());
  };

  return (
    <SearchContainer>
      <SearchTitle>
        <IoMdSearch size={36} color="B47B46" />
        <SearchText>원하는 붕어빵 집을 검색해 보세요!</SearchText>
      </SearchTitle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="search"
          placeholder="장소를 입력해 주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">검색하기</SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  width: 1280px;
  margin: 30px auto;
  padding: 30px;
  text-align: center;
  border: 2px #b47b46 solid;
  border-radius: 10px;
`;

const SearchTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchText = styled.span`
  font-size: 28px;
  color: var(--font--primary--color);
  font-weight: 500;
`;

const SearchForm = styled.form`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const SearchInput = styled.input`
  width: 500px;
  padding: 15px 15px;
  font-family: 'yg-jalnan';
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #2e2e2e;
  outline: none;

  &::placeholder {
    color: var(--font--secondary--color);
  }

  &:focus {
    border-color: #b47b46;
  }
`;

const SearchButton = styled.button`
  padding: 10px 25px;
  font-family: 'yg-jalnan';
  font-size: 16px;
  background-color: var(--button--color);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #b98e38;
  }
`;

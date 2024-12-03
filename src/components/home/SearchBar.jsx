import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const fetchPlaces = async (keyword) => {
  const places = new kakao.maps.services.Places();
  const result = new Promise((resolve, reject) => {
    places.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(
          data.map((location) => ({
            lat: parseFloat(location.y),
            lng: parseFloat(location.x),
            content: location.place_name
          }))
        );
      } else {
        reject(new Error('검색 결과가 없습니다.'));
      }
    });
  });

  console.log(result);
  return result;
};

const SearchBox = ({ searchTerm, setSearchTerm, onSearch }) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['places', searchTerm],
    queryFn: async () => await fetchPlaces(searchTerm),
    enabled: false,
    onSuccess: () => {},
    onError: (err) => toast.error(err.message)
  });

  useEffect(() => {
    if (!data) return;
    onSearch(data);
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error('검색어를 입력해 주세요');
      return;
    }
    refetch();
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

export default SearchBox;

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

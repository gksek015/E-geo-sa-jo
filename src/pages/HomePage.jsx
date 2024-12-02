import styled from 'styled-components';
import GlobalStyle from '../styled/GlobalStyle';
import HeroSession from '../components/home/HeroSession';
import { IoMdSearch } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isSearchTerm, setIsSearchTerm] = useState(false);

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  // 검색 기능을 위한 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const place = new kakao.maps.services.Places();

      // 장소 키워드 검색
      place.keywordSearch(searchTerm, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const newMarkers = data.map((location) => {
            bounds.extend(new kakao.maps.LatLng(location.y, location.x));
            return {
              position: {
                lat: parseFloat(location.y),
                lng: parseFloat(location.x)
              },
              content: location.place_name
            };
          });
          setMarkers(newMarkers); //검색한 결과를 마커로 나타나게 설정
          setInfo(null); // 이전에 있던 정보를 초기화
          map.setBounds(bounds); // 지도 범위
          setIsSearchTerm(true);
        } else {
          toast.error('검색결과가 없습니다.');
          setIsSearchTerm(false);
        }
      });
    } else {
      toast.error('검색어를 입력하세요.');
    }
  };

  // 현재 내 위치를 보여주는 geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할 수 없습니다.',
        isLoading: false
      }));
    }
  }, []);

  return (
    <>
      {/* HeroSession  */}
      <GlobalStyle />
      <HeroSession />

      {/* SearchContainer */}
      <SearchContainer>
        <SearchTitle>
          <IoMdSearch size={36} color="B47B46" />
          <SearchText>원하는 붕어빵 집을 검색해 보세요!</SearchText>
        </SearchTitle>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="search"
            placeholder="장소를 입력해 주세요"
            value={searchTerm ?? ''}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">검색하기</SearchButton>
        </SearchForm>
      </SearchContainer>

      <MapContainer>
        <MapTitle>현재 내 위치는 어디일까요?</MapTitle>
        <Map // 지도를 표시할 Container
          center={state.center}
          style={{
            // 지도의 크기
            width: '1280px',
            height: '450px'
          }}
          level={2} // 지도의 확대 레벨
          onCreate={setMap}
        >
          {!state.isLoading && !isSearchTerm && (
            <MapMarker position={state.center}>
              <div style={{ padding: '5px', color: '#000' }}>{state.errMsg || '현재위치'}</div>
            </MapMarker>
          )}

          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
            </MapMarker>
          ))}
        </Map>
      </MapContainer>
    </>
  );
};

export default HomePage;

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

  &::placehorder {
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

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MapTitle = styled.p`
  font-size: 28px;
  text-align: center;
  color: var(--font--primary--color);
  margin: 20px;
`;

import styled from 'styled-components';
import GlobalStyle from '../styled/GlobalStyle';

import HeroSession from '../components/home/HeroSession';
import MapDisplay from '../components/home/MapDisplay';
import SearchBar from '../components/home/SearchBar';

import useUserLocation from '../hooks/useUserLocation';
import useSearchPlaces from '../hooks/useSearchPlaces';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [markers, setMarkers] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [info, setInfo] = useState(null);

  const { data: userLocation, isLoading: isLoadingLocation, error: locationError } = useUserLocation();
  const { data: searchResults, refetch, isFetching } = useSearchPlaces(searchTerm); // `isFetching` 추가

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error('검색어를 입력해 주세요');
      return;
    }
    await refetch();
  };

  // 검색 결과 처리
  useEffect(() => {
    if (!isFetching && searchResults) {
      if (searchResults.length) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = searchResults.map((place) => {
          const position = new kakao.maps.LatLng(place.lat, place.lng);
          bounds.extend(position);
          return {
            lat: place.lat,
            lng: place.lng,
            content: place.content
          };
        });
        setMarkers(newMarkers);
        setMapBounds(bounds);
        setInfo(null);
      } else {
        toast.error('검색 결과가 없습니다.');
        setMarkers([]);
        setMapBounds(null);
      }
    }
  }, [searchResults, isFetching]);

  return (
    <>
      <GlobalStyle />
      <HeroSession />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      <MapContainer>
        <MapTitle>
          {markers.length ? `${searchTerm} 검색된 장소는 ${markers.length}개입니다.` : '현재 내 위치는 어디일까요?'}
        </MapTitle>
        <MapDisplay
          center={userLocation}
          bounds={mapBounds}
          markers={markers}
          isLoading={isLoadingLocation}
          locationError={locationError}
          onMarkerClick={setInfo}
          info={info}
        />
      </MapContainer>
    </>
  );
};

export default HomePage;

// 스타일 컴포넌트 정의는 동일

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const MapTitle = styled.p`
  font-size: 28px;ck
  text-align: center;
  color: var(--font--primary--color);
  margin-bottom: 20px;
`;

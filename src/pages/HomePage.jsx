import styled from 'styled-components';
import GlobalStyle from '../styled/GlobalStyle';
import HeroSession from '../components/home/HeroSession';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import MapDisplay from '../components/home/MapDisplay';
import SearchBar from '../components/home/SearchBar';

// Geolocation 데이터를 가져오는 함수
const fetchUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation을 사용할 수 없습니다.');
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
      (err) => reject(new Error(err.message))
    );
  });
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [markers, setMarkers] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [info, setInfo] = useState(null);

  // 현재 위치 가져오기
  const {
    data: userLocation,
    isLoading: isLoadingLocation,
    error: locationError
  } = useQuery({
    queryKey: ['userLocation'],
    queryFn: fetchUserLocation
  });

  // 장소 검색 핸들러
  const handleSearch = (results) => {
    if (results.length) {
      const bounds = new kakao.maps.LatLngBounds();
      const newMarkers = results.map((place) => {
        const position = new kakao.maps.LatLng(place.lat, place.lng);
        bounds.extend(position);
        return {
          lat: place.lat,
          lng: place.lng,
          content: place.content
        };
      });
      setMarkers(newMarkers);
      setMapBounds(bounds); // 검색 결과 전체를 포함하는 범위 설정
      setInfo(null);
    } else {
      toast.error('검색 결과가 없습니다.');
    }
  };

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

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const MapTitle = styled.p`
  font-size: 28px;
  text-align: center;
  color: var(--font--primary--color);
  margin-bottom: 20px;
`;

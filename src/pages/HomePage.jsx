import styled from 'styled-components';
import GlobalStyle from '../styled/GlobalStyle';
import HeroSession from '../components/home/HeroSession';
import { IoMdSearch } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState();
  // const [info, setInfo] = useState();
  // const [markers, setMarkers] = useState([]);
  // const [map, setMap] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.Trim()) {
      console.log(`${searchTerm}`);
    } else {
      toast.error('검색어를 입력하세요.');
    }
  };

  // // 현재 내 위치를 지도에 찍기 위한 geolocation 로직
  // const [state, setState] = useState({
  //   center: {
  //     lat: 33.450701,
  //     lng: 126.570667
  //   },
  //   errMsg: null,
  //   isLoading: true
  // });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setState((prev) => ({
  //           ...prev,
  //           center: {
  //             lat: position.coords.latitude, // 위도
  //             lng: position.coords.longitude // 경도
  //           },
  //           isLoading: false
  //         }));
  //       },
  //       (err) => {
  //         setState((prev) => ({
  //           ...prev,
  //           errMsg: err.message,
  //           isLoading: false
  //         }));
  //       }
  //     );
  //   } else {
  //     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  //     setState((prev) => ({
  //       ...prev,
  //       errMsg: 'geolocation을 사용할수 없어요..',
  //       isLoading: false
  //     }));
  //   }
  // }, []);

  // // 키워드를 검색했을 때 맵에서 표현하기 위한 로직
  // useEffect(() => {
  //   if (!map) return;
  //   const ps = new kakao.maps.services.Places();

  //   ps.keywordSearch('붕어빵', (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds();
  //       let markers = [];

  //       for (var i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x
  //           },
  //           content: data[i].place_name
  //         });
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }
  //       setMarkers(markers);

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds);
  //     }
  //   });
  // }, [map]);
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></SearchInput>
          <SearchButton type="submit">검색하기</SearchButton>
        </SearchForm>
      </SearchContainer>

      {/* <>
        <Map // 지도를 표시할 Container
          center={state.center}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px'
          }}
          level={2} // 지도의 확대 레벨
          onCreate={setMap}
        >
          {!state.isLoading && (
            <MapMarker position={state.center}>
              <div style={{ padding: '5px', color: '#000' }}>{state.errMsg ? state.errMsg : '여기에 계신가요?!'}</div>
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
      </> */}
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

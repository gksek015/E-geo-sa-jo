import React, { useEffect } from 'react';
import { usePostStore } from '../../zustand/usePostStore';

const PostMap = () => {
  const { setFormData } = usePostStore();

  useEffect(() => {
    const waitForKakaoMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
        } else {
          // SDK 로드를 확인하기 위한 반복 시도
          const interval = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
              clearInterval(interval);
              resolve(window.kakao);
            }
          }, 100);

          // 일정 시간 내에 로드되지 않으면 에러 발생
          setTimeout(() => {
            clearInterval(interval);
            reject(new Error('Kakao Maps SDK가 로드되지 않았습니다.'));
          }, 5000); // 5초 대기
        }
      });
    };

    waitForKakaoMaps()
      .then((kakao) => {

        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 로케이션 컬럼 중 한 좌표와 연결해보는게 첫번째 // 제이슨파싱
          level: 3
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);
        const geocoder = new kakao.maps.services.Geocoder();
        const marker = new kakao.maps.Marker();
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          const coords = mouseEvent.latLng; //콘솔출력으로 coords를 찍어보고

          geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              const address = result[0]?.address?.address_name || '주소를 가져올 수 없습니다';

              //주소와 좌표 저장
              setFormData('map_address', address);
              setFormData('location', { lat: coords.getLat(), lng: coords.getLng() });

              marker.setPosition(coords); // cooords의 모양에 맞게 만들어준다.
              marker.setMap(map); //marker.

              const content = `<div style="padding:5px;">${address}</div>`;
              infowindow.setContent(content);
              infowindow.open(map, marker);
            } else {
              console.error('주소 변환 실패:', status);
            }
          });
        });
      })
      .catch((error) => {
        console.error('Kakao Maps SDK 로드 실패:', error);
      });
  }, [setFormData]);

  return (
    <div
      id="map"
      style={{
        width: '100%', // 부모 컨테이너의 너비에 맞추기
        height: '100%', // 부모 컨테이너의 높이에 맞추기
        borderRadius: '12px', // 라운드 처리
        overflow: 'hidden', // 지도 영역 넘침 방지
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // 약간의 그림자 효과
      }}
    ></div>
  );
};

export default PostMap;

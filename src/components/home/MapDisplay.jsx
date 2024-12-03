import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapView = ({ center, bounds, markers, isLoading, locationError, onMarkerClick, info }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && bounds) {
      map.setBounds(bounds);
    }
  }, [map, bounds]);

  if (isLoading) return <div>위치를 불러오는 중입니다...</div>;
  if (locationError) return <div>{locationError.message}</div>;

  return (
    <Map
      center={center} // 지도 초기 중심 좌표
      style={{ width: '1280px', height: '450px' }}
      level={2} // 기본 확대 레벨
      onCreate={setMap} // Map 객체를 상태로 저장
    >
      {/* 현재 위치를 표시하는 기본 마커 */}
      {!markers.length && (
        <MapMarker position={center}>
          <div style={{ padding: '5px', color: '#000' }}>현재위치</div>
        </MapMarker>
      )}

      {/* 검색된 장소를 표시하는 마커 */}
      {markers.map((marker, index) => (
        <MapMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => onMarkerClick(marker)}>
          {info?.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  );
};

export default MapView;

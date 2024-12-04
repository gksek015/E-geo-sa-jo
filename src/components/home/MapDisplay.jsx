import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapDisplay = ({ center, bounds, markers, isLoading, locationError, onMarkerClick, info }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && bounds) {
      map.setBounds(bounds);
    }
  }, [map, bounds]);

  if (isLoading) return <div>위치를 불러오는 중입니다...</div>;
  if (locationError) return <div>{locationError.message}</div>;

  return (
    <Map center={center} style={{ width: '1280px', height: '450px' }} level={2} onCreate={setMap}>
      {!markers.length && (
        <MapMarker position={center}>
          <div style={{ padding: '5px', color: '#2e2e2e', marginRight: '-20px' }}>현재위치</div>
        </MapMarker>
      )}
      {markers.map((marker, index) => (
        <MapMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => onMarkerClick(marker)}>
          {info?.content === marker.content && <div style={{ color: '#2e2e2e' }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  );
};

export default MapDisplay;

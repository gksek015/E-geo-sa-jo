import { useQuery } from '@tanstack/react-query';

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

const useUserLocation = () => {
  return useQuery({
    queryKey: ['userLocation'],
    queryFn: fetchUserLocation
  });
};

export default useUserLocation;

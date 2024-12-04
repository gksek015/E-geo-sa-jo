import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchPlaces = async (keyword) => {
  const places = new kakao.maps.services.Places();
  return new Promise((resolve, reject) => {
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
};

const useSearchPlaces = (keyword) => {
  return useQuery({
    queryKey: ['places', keyword],
    queryFn: () => fetchPlaces(keyword),
    enabled: false,
    onError: (err) => toast.error(err.message)
  });
};

export default useSearchPlaces;

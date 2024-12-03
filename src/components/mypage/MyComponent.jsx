import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../supabase/supabaseClient';

const fetchDefaultImageUrl = () => {
  const { data } = supabase.storage.from('post_image').getPublicUrl('default.png');
  return data?.publicUrl || null;
};

const fetchMyData = async () => {
  const { data } = await supabase.from('stores').select('name, map_address, category');
  return data;
};

const MyComponent = () => {
    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [categories] = useState(['가게 종류', '노상', '카페', '편의점', '기타']);
    const [selectedCategory, setSelectedCategory] = useState('가게 종류');
    const [defaultImage, setDefaultImage] = useState(null);
  
    useEffect(() => {
      const loadDefaultImage = () => {
        const imageUrl = fetchDefaultImageUrl();
        setDefaultImage(imageUrl);
      };
  
      const loadData = async () => {
        const fetchedData = await fetchMyData();
        setStores(fetchedData || []);
        setFilteredStores(fetchedData || []);
      };
  
      loadDefaultImage();
      loadData();
    }, []);
  
    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setSelectedCategory(category);
  
      if (category === '가게 종류') {
        setFilteredStores(stores);
      } else {
        const filtered = stores.filter((store) => store.category === category);
        setFilteredStores(filtered);
      }
    };
  
    return (
      <PageContainer>
        <HeaderContainer>
          <HeaderTextContainer>
            <HeaderText>마이페이지</HeaderText>
            <CategorySelector onChange={handleCategoryChange} value={selectedCategory}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </CategorySelector>
          </HeaderTextContainer>
        </HeaderContainer>
        <StoreContainer>
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <StoreCard key={index}>
                <StoreImage src={defaultImage} alt="default" />
                <StoreName>{store.name || '이름 없음'}</StoreName>
                <StoreAddress>{store.map_address || '주소 없음'}</StoreAddress>
                <StoreCategory>{store.category || '카테고리 없음'}</StoreCategory>
              </StoreCard>
            ))
          ) : (
            <NoDataMessage>표시할 데이터가 없습니다.</NoDataMessage>
          )}
        </StoreContainer>
      </PageContainer>
    );
  };

export default MyComponent;

const PageContainer = styled.div`
  width: 1400px;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 100vh;
`;

const HeaderContainer = styled.div`
  width: 1400px;
  margin: 0 auto;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.p`
  font-family: 'yg-jalnan';
  color: #b47b46;
  font-size: 28px;
`;

const CategorySelector = styled.select`
  font-family: 'yg-jalnan';
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: var(--button--color);
  cursor: pointer;

  &:hover {
    border-color: #888;
  }
`;

const StoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const StoreCard = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;

  &:hover {
    background-color: #f0e6d2;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const StoreImage = styled.img`
  width: 55%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  margin-bottom: 10px;
`;

const StoreName = styled.h2`
  font-size: 22px;
  font-family: 'yg-jalnan';
  color: #b47b46;
  margin-bottom: 10px;
`;

const StoreAddress = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const StoreCategory = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 0;
`;

const NoDataMessage = styled.p`
  grid-column: span 4;
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
`;

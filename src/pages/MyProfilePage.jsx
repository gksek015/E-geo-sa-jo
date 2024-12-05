import styled from 'styled-components';

import ProfileImageForm from '../components/myProfile/ProfileImageForm';
import ProfileDataForm from '../components/myProfile/ProfileDataForm';

import { useState, useEffect } from 'react';

import { fetchDefaultImage, fetchUserProfile } from '../api/profileApi';

const MyProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [currentNickname, setCurrentNickname] = useState('');

  // 마운트 시 유저 프로필 이미지, 닉네임 가져오기
  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfileImage(userProfile.profile_image);
        setCurrentNickname(userProfile.nick_name);
      } catch (error) {
        console.error(error);
        const defaultImg = fetchDefaultImage();
        setProfileImage(defaultImg);
        setCurrentNickname('Guest');
      }
    };
    fetchUserProfileImage();
  }, []);

  return (
    <ProfileContainer>
      <ProfileImageForm profileImage={profileImage} setProfileImage={setProfileImage} />
      <ProfileDataForm currentNickname={currentNickname} setCurrentNickname={setCurrentNickname} />
    </ProfileContainer>
  );
};

export default MyProfilePage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 22px 20px;
  font-family: 'yg-jalnan', sans-serif;
  width: 1280px;
  background-color: var(--background--color);
`;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoLogOutOutline } from 'react-icons/io5';
import supabase from '../supabase/supabaseClient';

const MyProfilePage = () => {
  const [userImage, setUserImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [newNickname, setNewNickname] = useState();
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    const fetchDefaultImage = () => {
      const { data } = supabase.storage.from('profile_image').getPublicUrl('default.png');
      // console.log('data', data) // data 라는 객체 안에 publicUrl 키값으로 반환하는 것 확인!
      // console.log('data.publicUrl', data.publicUrl)

      setDefaultImage(data.publicUrl);
    };

    fetchDefaultImage();
  }, []);

  const handleUpload = async (file) => {
    const profileImageFile = e.target.files[0];

    const { data: imageData, error } = await supabase.storage.from('profile_image').upload(`${uuidv4()}.png`, file);

    console.log('data', data);

    if (error) {
      clonsole.log(error);
      return;
    }

    const { data } = supabase.storage.from('profile_images').getPublicUrl(imageData.path);

    setUserImage(data.publicUrl);
  };

  const handleNicknameChange = async () => {
    let { data: users, error } = await supabase.from('users').select('nick_name');
  };

  const handlePasswordChange = () => {};

  const handleDeleteAccount = () => {};

  return (
    <ProfileContainer>
      <ImageContainer>
        <h2>My Profile</h2>
        <StyledLabel htmlFor="profileImage">
          <img src={userImage || defaultImage} alt="Profile" />
        </StyledLabel>
        <StyledInput id="profileImage" type="file" accept="image/*" onChange={() => handleUpload(file)} />
        <ImageButtonGroup>
          <UploadButton as="label" htmlFor="profileImage">
            프로필 사진 업로드
          </UploadButton>
          <UpdateButton>저장</UpdateButton>
        </ImageButtonGroup>
      </ImageContainer>

      <InputGroup>
        <div>
          <input
            type="text"
            value={newNickname}
            placeholder="닉네임"
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <NicknameButton onClick={handleNicknameChange}>닉네임 변경</NicknameButton>
        </div>
        <div>
          <input
            type="password"
            value={newPassword}
            placeholder="새 비밀번호"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordButton onClick={handlePasswordChange}>비밀번호 변경</PasswordButton>
        </div>
      </InputGroup>
      <DeleteButton type="button" onClick={handleDeleteAccount}>
        <IoLogOutOutline />
        계정 삭제
      </DeleteButton>
    </ProfileContainer>
  );
};

export default MyProfilePage;

const ProfileContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 50px 20px;
  font-family: 'yg-jalnan', sans-serif;
  width: 1400px;
  height: 700px;
  background-color: var(--background--color);
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  h2 {
    font-size: 40px;
    color: var(--font--primary--color);
  }
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 216px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  overflow: hidden; /* 이미지가 영역을 벗어나지 않도록 설정 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 비율을 유지하면서 영역을 채우도록 설정 */
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const ImageButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const UploadButton = styled.button`
  font-family: 'yg-jalnan', sans-serif;
  font-size: 18px;
  background-color: var(--button--color);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 13.3px 20px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const UpdateButton = styled(UploadButton)`
  padding: 10px 20px;
`

const InputGroup = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 27px;

  div {
    display: flex;
    gap: 16px;
  }

  input {
    width: 320px;
    height: 38px;
    border: none;
    font-family: 'yg-jalnan', sans-serif;
    font-size: 14px;
    padding: 9px 20px;
    border-radius: 5px;
  }
`;

const NicknameButton = styled.button`
  font-family: 'yg-jalnan', sans-serif;
  font-size: 14px;
  background-color: var(--button--color);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0 32px;

  &:hover {
    cursor: pointer;
  }
`;

const PasswordButton = styled(NicknameButton)`
  padding: 0 25px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-left: auto;
  margin-right: 440px;
  border: none;
  padding: 4px 8px;
  background-color: transparent;
  gap: 2px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

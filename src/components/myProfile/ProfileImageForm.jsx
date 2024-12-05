import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { updateProfileImage } from '../../api/profileApi';

const ProfileImageForm = ({ profileImage, setProfileImage }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // 프로필 사진 파일 업로드
  const handleUpload = useCallback((e) => {
    e.preventDefault();
    const fileObj = e.target.files[0];
    setFile(fileObj);
    const ObjectUrl = URL.createObjectURL(fileObj);
    setPreview(ObjectUrl);
  }, []);

  // 프로필 사진 수파베이스에 저장
  const handleImageUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (!file) return toast.warning('업로드할 파일을 선택하세요!');
      const imageUrl = await updateProfileImage(file);
      setProfileImage(imageUrl);
      toast.success('프로필 사진이 변경되었습니다.');
    },
    [file, setProfileImage]
  );

  //
  const userProfileImage = useMemo(() => preview || profileImage, [preview, profileImage]);

  return (
    <ImageContainer onSubmit={handleImageUpdate}>
      <h2>My Profile</h2>
      <StyledLabel htmlFor="profileImage">
        <img src={userProfileImage} alt="프로필 사진" />
      </StyledLabel>
      <StyledInput id="profileImage" type="file" accept="image/*" onChange={handleUpload} />
      <ImageButtonGroup>
        <UploadButton as="label" htmlFor="profileImage">
          프로필 사진 업로드
        </UploadButton>
        <UpdateButton type="submit">저장</UpdateButton>
      </ImageButtonGroup>
    </ImageContainer>
  );
};

export default ProfileImageForm;

const ImageContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

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
`;

const UploadButton = styled.button`
  font-size: 18px;
  background-color: var(--button--color);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 15px 20px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const UpdateButton = styled(UploadButton)`
  padding: 10px 20px;
`;

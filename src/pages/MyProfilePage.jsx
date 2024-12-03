import { useState, useEffect } from 'react';
import supabase from '../supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { IoLogOutOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
  const [preview, setPreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [newNickname, setNewNickname] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // 유저 프로필 이미지 가져오기
    const fetchUserProfileImage = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      const userId = user.id;

      if (userError || !user) {
        toast.error('로그인 상태를 확인하세요!');
        return;
      }

      const { data: userProfile, error } = await supabase
        .from('users')
        .select('profile_image, nick_name')
        .eq('id', userId)
        .single();

      if (error) {
        toast.error('유저 정보 로딩 실패!');
        return;
      }
      setProfileImage(userProfile.profile_image);
      setCurrentNickname(userProfile.nick_name);
    };

    fetchUserProfileImage();
  }, []);

  // 업로드 할 이미지 미리보기
  const handleUpload = (e) => {
    e.preventDefault();
    const fileObj = e.target.files[0];
    setFile(fileObj);
    const ObjectUrl = URL.createObjectURL(fileObj);
    setPreview(ObjectUrl);
  };

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning('업로드할 파일을 선택하세요!');

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error('로그인 상태를 확인하세요!');
      return;
    }

    const { data: imageData, error } = await supabase.storage.from('profile_image').upload(`${uuidv4()}.png`, file);

    if (error) {
      console.error(error);
      toast.error('프로필 사진 변경에 실패했습니다.');
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('profile_image').getPublicUrl(imageData.path);
    const imageUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase.from('users').update({ profile_image: imageUrl }).eq('id', user.id);

    if (updateError) {
      console.error(updateError);
      toast.error('프로필 사진 변경에 실패했습니다.');
    }

    setProfileImage(imageUrl);
    toast.success('프로필 사진이 변경되었습니다.');
  };

  // 기존 닉네임 불러오기 및 새로운 닉네임 변경 로직
  const handleNicknameChange = async (e) => {
    e.preventDefault();

    if (!newNickname || newNickname === currentNickname) {
      toast.warning('변경할 닉네임을 입력해주세요!');
      return;
    }

    const { data: existingNicknames, error: checkError } = await supabase
      .from('users')
      .select('nick_name')
      .eq('nick_name', newNickname);

    if (checkError) {
      toast.error('닉네임 확인 중 오류가 발생했습니다.');
      return;
    }

    if (existingNicknames > 0) {
      toast.warning('이미 사용 중인 닉네임입니다!');
      return;
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error('로그인 상태를 확인하세요!');
      return;
    }

    const { error: updateError } = await supabase.from('users').update({ nick_name: newNickname }).eq('id', user.id);

    if (updateError) {
      toast.error('닉네임 변경에 실패했습니다.');
      return;
    }

    setCurrentNickname(newNickname);
    toast.success('닉네임이 변경되었습니다.');
  };

  // 비밀번호 변경 로직
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast.warning('8자 이상의 새로운 비밀번호를 입력하세요!');
      return;
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (passwordError) {
      toast.error('비밀번호 변경에 실패했습니다.');
      return;
    }

    setNewPassword('');
    toast.success('비밀번호가 변경되었습니다.');
  };

  // 계정삭제 기능 로직
  const handelDeleteAccount = async () => {

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error('로그인 상태를 확인하세요!');
      return;
    }

    const user_id = user.id;
    await supabase.auth.signOut();

    const { error } = await supabase.rpc('delete_user', { user_id });
    if (error) {
      toast.error('에러가 발생했습니다!')
    }
    toast.success('계정이 삭제되었습니다.')

    navigate('/');
  };

  return (
    <ProfileContainer>
      <ImageContainer onSubmit={handleImageUpdate}>
        <h2>My Profile</h2>
        <StyledLabel htmlFor="profileImage">
          <img src={preview || profileImage} alt="Profile" />
        </StyledLabel>
        <StyledInput id="profileImage" type="file" accept="image/*" onChange={handleUpload} />
        <ImageButtonGroup>
          <UploadButton as="label" htmlFor="profileImage">
            프로필 사진 업로드
          </UploadButton>
          <UpdateButton type="submit">저장</UpdateButton>
        </ImageButtonGroup>
      </ImageContainer>

      <InputGroup>
        <div>
          <input
            type="text"
            value={newNickname || currentNickname || ''}
            placeholder="닉네임"
            onChange={(e) => setNewNickname(e.target.value)}
            onFocus={() => setCurrentNickname('')}
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
      <DeleteButton type="button" onClick={handelDeleteAccount}>
        <IoLogOutOutline />
        계정 삭제
      </DeleteButton>
    </ProfileContainer>
  );
};

export default MyProfilePage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 30px;
  padding: 40px 20px;
  font-family: 'yg-jalnan', sans-serif;
  width: 1280px;
  background-color: var(--background--color);
`;

const ImageContainer = styled.form`
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

const InputGroup = styled.form`
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
  font-size: 14px;
  background-color: var(--button--color);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0 30px;

  &:hover {
    cursor: pointer;
  }
`;

const PasswordButton = styled(NicknameButton)`
  padding: 0 23px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-left: auto;
  margin-right: 380px;
  border: none;
  padding: 4px 8px;
  background-color: transparent;
  gap: 2px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

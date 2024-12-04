import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { updateNickname } from '../../api/profileApi';
import { toast } from 'react-toastify';
import { deleteUser, updatePassword } from '../../api/authApi';
import { IoLogOutOutline } from 'react-icons/io5';

const ProfileDataForm = ({ currentNickname, setCurrentNickname }) => {
  const [newNickname, setNewNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // 기존 닉네임 불러오기 및 새로운 닉네임 변경 로직
  const handleNicknameChange = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newNickname || newNickname === currentNickname) {
        toast.warning('변경할 닉네임을 입력해주세요!');
        return;
      }

      if (newNickname.length < 2) {
        toast.warning('2자 이상의 닉네임을 입력해주세요!');
        return;
      }

      const isSuccess = await updateNickname(newNickname);
      if (!isSuccess) {
        return;
      }
      setCurrentNickname(newNickname);
      toast.success('닉네임이 변경되었습니다.');
    },
    [newNickname, currentNickname, setCurrentNickname]
  );

  // 비밀번호 변경
  const handlePasswordChange = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newPassword || newPassword.length < 8) {
        toast.warning('8자 이상의 새로운 비밀번호를 입력하세요!');
        return;
      }
      const isSuccess = await updatePassword(newPassword);
      if (!isSuccess) {
        return;
      }
      setNewPassword('');
      toast.success('비밀번호가 변경되었습니다.');
    },
    [newPassword]
  );

  // 계정 삭제
  const handleDeleteAccount = useCallback(async () => {
    const confirmed = window.confirm('정말로 계정을 삭제하시겠습니까?');
    if (!confirmed) return;
    const isSuccess = await deleteUser();
    if (!isSuccess) {
      return;
    }
    toast.success('계정이 삭제되었습니다.');
    navigate('/');
  }, [navigate]);

  return (
    <>
      <InputGroup onSubmit={handleNicknameChange}>
        <input
          type="text"
          defaultValue={currentNickname}
          placeholder="닉네임"
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <NicknameButton type="submit">닉네임 변경</NicknameButton>
      </InputGroup>
      <InputGroup onSubmit={handlePasswordChange}>
        <input
          type="password"
          value={newPassword}
          placeholder="새 비밀번호"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <PasswordButton type="submit">비밀번호 변경</PasswordButton>
      </InputGroup>
      <DeleteButton type="button" onClick={handleDeleteAccount}>
        <IoLogOutOutline />
        계정 삭제
      </DeleteButton>
    </>
  );
};

export default ProfileDataForm;

const InputGroup = styled.form`
  margin-top: 28px;
  display: flex;
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
  margin-top: 30px;
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

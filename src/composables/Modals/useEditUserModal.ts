import { reactive } from 'vue';
import { useModal } from './useModal';
import type { User } from '../../types/index';

const { modalState, openModal, closeModal } = useModal();

const editUserData = reactive<User>({
  id: null,
  name: '',
  email: '',
  gender: '',
  status: 'active',
});

const closeEditUserModal = () => {
  closeModal();
};

const openEditUserModal = (user: User) => {
  editUserData.id = user.id;
  editUserData.name = user.name;
  editUserData.email = user.email;
  editUserData.gender = user.gender;
  editUserData.status = user.status;

  openModal();
};

export const useEditUserModal = () => {
  return {
    editUserData,
    editUserModalState: modalState,
    openEditUserModal,
    closeEditUserModal,
  };
};

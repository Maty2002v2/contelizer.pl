import { ref } from 'vue';

export const useModal = () => {
  const modalState = ref(false);

  const openModal = () => {
      modalState.value = true;
  };

  const closeModal = () => {
      modalState.value = false;
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};

import { ref } from 'vue';

export const useCheckPesel = () => {
  const peselIsValid = ref<boolean | null>(null);

  const validation = (pesel: string) => {
    peselIsValid.value = null;

    if (!/^\d{11}$/.test(pesel)) {
      peselIsValid.value = false;
      return;
    };

    const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += +pesel[i] * weights[i];
    }

    const controlNukber = sum % 10;
    peselIsValid.value = controlNukber === +pesel[10];
  };

  return {
    peselIsValid,
    validation,
  }
};

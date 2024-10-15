import { ref } from 'vue';

export const useReadFile = () => {
  const fileContent = ref<string | null>(null);

  const handleFileUpload = (event: InputEvent) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileContent.value = e.target.result as string;
      };
      reader.readAsText(file);
    }
  };

  return {
    fileContent,
    handleFileUpload,
  };
};

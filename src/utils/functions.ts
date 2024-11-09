
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the selected file to a Base64 string
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};



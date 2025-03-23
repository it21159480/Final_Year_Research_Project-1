import axios from 'axios';

export const makePrediction = async (imageUri: string) => {
  let formData = new FormData();
  formData.append('image', { uri: imageUri, type: 'image/jpeg', name: 'image.jpg' });

  try {
    const response = await axios.post(
      'http://172.28.30.127:5000/predict',  // Use this IP for Android Emulator
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error: unknown) { 
    if (axios.isAxiosError(error)) {
      console.error('Error making request:', error.response || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error; 
  }
};








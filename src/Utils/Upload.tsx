import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dvqzu9oin/image/upload';
const UPLOAD_PRESET = 'instascan'; 

export const uploadImage = async (image:any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || 'upload.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);
    console.log('Form Data:', formData);
    
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload Success:', response.data.secure_url);
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };
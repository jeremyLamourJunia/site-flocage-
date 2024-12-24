import axios from 'axios';

export const API_URL = 'https://api-flocage.vercel.app';

export const orderApi = {
  submitOrder: async (formData: FormData) => {
    return axios.post(`${API_URL}/order`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
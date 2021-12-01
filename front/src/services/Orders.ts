import axios from 'axios';

const baseUrl = 'api/ordenes';

export const saveOrder = async () => {
  try {
    const response = await axios.post(baseUrl);
    return response.data.data;
  } catch (e) {
    throw e;
  }
};

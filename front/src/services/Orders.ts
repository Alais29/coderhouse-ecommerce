import axios from 'axios';

const baseUrl = 'api/ordenes';

export const sendOrder = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data;
  } catch (e) {
    throw e;
  }
};

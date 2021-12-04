import axios from 'axios';

const baseUrl = 'api/ordenes';

export const getOrders = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const saveOrder = async () => {
  try {
    const response = await axios.post(baseUrl);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

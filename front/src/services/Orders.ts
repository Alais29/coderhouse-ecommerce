import axios from 'axios';

const baseUrl = 'api/ordenes';

export const getOrders = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data.message);
    else console.log(e)
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/all-orders`);
    return response.data.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data.message);
    else console.log(e)
  }
};

export const saveOrder = async () => {
  try {
    const response = await axios.post(baseUrl);
    return response.data.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data.message);
    else console.log(e)
  }
};

export const completeOrder = async (id: string) => {
  try {
    const response = await axios.put(`${baseUrl}/complete`, { id });
    return response.data.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data.message);
    else console.log(e)
  }
};

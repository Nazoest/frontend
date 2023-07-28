import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backend='https://kickspot.onrender.com'


export const fetchProducts = createAsyncThunk(`${backend}/fetch/products`, async () => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const { data } = await axios.get(`${backend}/api/items`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
});

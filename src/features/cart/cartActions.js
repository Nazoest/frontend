import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backend='https://kickspot.onrender.com'


export const getCart = createAsyncThunk(`${backend}/cart/fetchCart`, async id => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.get(`${backend}/api/cart/:${id}`, config);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addToCart = createAsyncThunk(`${backend}/cart/addToCart`, async data => {
  const { userId, productId, quantity } = data;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(
      `${backend}/api/cart/:${userId}`,
      { productId, quantity },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateCart = createAsyncThunk('/cart/update', async data => {
  const { userId, productId, qty } = data;
  try {
    const { data } = await axios.put(`/api/cart/:${userId}`, {
      productId,
      qty
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteCartItem = createAsyncThunk(
  `${backend}cart/deleteFromCart`,
  async data => {
    const { userId, productId } = data;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.delete(
        `${backend}/api/cart/:${userId}/${productId}`,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

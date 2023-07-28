import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backend='https://kickspot.onrender.com'

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${backend}/api/register`,
        { name, email, password },
        config
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(`${backend}
  user/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      return await axios
        .post(`${backend}/api/login`, { email, password }, config)
        .then(response => {
          if (response.data.userToken) {
            localStorage.setItem('userToken', response.data.userToken);
          }

          return response.data;
        });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  `${backend}user/getUserDetails`,
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };

      const { data } = await axios.get(`${backend}/api/profile`, config);

      return data;
    } catch (error) {}
  }
);

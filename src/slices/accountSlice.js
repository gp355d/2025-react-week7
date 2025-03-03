import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const { VITE_BASE_URL: API_URL } = import.meta.env;

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    cookie: '',
    isLogin: false,
  },
  reducers: {
    setCookie(state, action) {
      state.cookie = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const cookie = (state) => state.account?.cookie;
export const isLogin = (state) => state.account?.isLogin;

export const asyncCheckUser = createAsyncThunk(
  'asyncCheckUser',
  async function (payload, { dispatch }) {
    const { cookie, navigate } = payload; // 從 payload 拿到 navigate
    try {
      dispatch(accountSlice.actions.setCookie(cookie));
      await axios.post(`${API_URL}/v2/api/user/check`, null, {
        headers: {
          Authorization: cookie,
        },
      });
      dispatch(accountSlice.actions.setIsLogin(true));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || '請重新登入');
      dispatch(accountSlice.actions.setIsLogin(false));
      navigate('/login');
    }
  }
);

export const asyncLogout = createAsyncThunk(
  'asyncLogout',
  async function (payload, { dispatch }) {
    const { cookie, navigate } = payload;
    try {
      await axios.post(`${API_URL}/v2/logout`, {
        headers: {
          Authorization: cookie,
        },
      });
      dispatch(accountSlice.actions.setIsLogin(false));
      alert('登出成功');
      navigate('/login');
    } catch (error) {
      dispatch(accountSlice.actions.setIsLogin(true));
      console.log(error);
    }
  }
);

export default accountSlice.reducer;
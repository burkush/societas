import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import axios from 'axios';
import { API_URL } from './api';

export const useAuthStore = create()(
  devtools((set) => ({
    user: {},
    isAuth: false,
    isLoading: false,

    login: async (email, password) => {
      try {
        const response = await AuthService.login(email, password);
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true });
      } catch (error) {
        console.error(error.response?.data);
      }
    },

    logout: async () => {
      try {
        const response = await AuthService.logout();
        console.log(response);
        localStorage.removeItem('token');
        set({ user: {}, isAuth: false });
      } catch (error) {
        console.error(error.response?.data);
      }
    },

    register: async (email, password, firstName, lastName, birthDate) => {
      try {
        const response = await AuthService.register(
          email,
          password,
          firstName,
          lastName,
          birthDate
        );
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true });
      } catch (error) {
        console.error(error.response?.data);
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true
        });
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true });
      } catch (error) {
        console.error(error.response?.data);
      } finally {
        set({ isLoading: false });
      }
    }
  }))
);

export const useUserStore = create()(
  devtools((set) => ({
    user: {},
    isLoading: false,

    getUserInfo: async (userId) => {
      set({ isLoading: true });
      try {
        const response = await UserService.getUserInfo(userId);
        console.log(response);
        set({ user: response.data });
      } catch (error) {
        console.error(error.response?.data);
      } finally {
        set({ isLoading: false });
      }
    }
  }))
);

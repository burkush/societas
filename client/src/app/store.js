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
    error: null,

    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true, error: null });
        return true;
      } catch (error) {
        set({
          error:
            error.response?.data?.message ||
            'Unhandled error occured. Try again'
        });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await AuthService.logout();
        localStorage.removeItem('token');
        set({ user: {}, isAuth: false, error: null });
        return true;
      } catch (error) {
        set({
          error:
            error.response?.data?.message ||
            'Unhandled error occured. Try again'
        });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    register: async (email, password, firstName, lastName, birthDate) => {
      set({ isLoading: true });
      try {
        const response = await AuthService.register(
          email,
          password,
          firstName,
          lastName,
          birthDate
        );
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true, error: null });
        return true;
      } catch (error) {
        set({
          error:
            error.response?.data?.message ||
            'Unhandled error occured. Try again'
        });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true
        });
        localStorage.setItem('token', response.data.accessToken);
        set({ user: response.data.user, isAuth: true, error: null });
      } catch (error) {
        set({
          error:
            error.response?.data?.message ||
            'Unhandled error occured. Try again'
        });
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
    error: null,

    getUserInfo: async (userId) => {
      set({ isLoading: true });
      try {
        const response = await UserService.getUserInfo(userId);
        console.log(response.data);
        set({ user: response.data, error: null });
      } catch (error) {
        set({
          error:
            error.response?.data?.message ||
            'Unhandled error occured. Try again'
        });
      } finally {
        set({ isLoading: false });
      }
    }
  }))
);

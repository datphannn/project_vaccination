"use client"
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export const authStore = createStore<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

const useAuthStore = <T>(selector: (state: AuthStore) => T) => useStore(authStore, selector);

export default useAuthStore;
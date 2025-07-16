"use client"
import { create } from 'zustand';
    interface AuthStore {
        isLoggedIn: boolean;
        setIsLoggedIn: (status: boolean) => void;
    }
    const useAuthStore = create<AuthStore>((set) => ({
        isLoggedIn: false,
        setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    }));
    export default useAuthStore;

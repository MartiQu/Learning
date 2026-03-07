import { create } from 'zustand';
import { auth, onAuthStateChanged, type User } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const useAuthStore = create<AuthState>()((set) => {
  // Klausās Firebase auth stāvokļa pārmaiņas
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return { user: null, loading: true };
});

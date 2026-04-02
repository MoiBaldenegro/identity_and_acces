import { create } from 'zustand';
import { authServiceContainer, type AuthServiceContainer } from '../containers/authServiceContainer';

interface AuthState {
    auth: AuthServiceContainer
}

export const useAuthDependenciesStore = create<AuthState>(() => ({
    auth: authServiceContainer
}));
import { defineStore } from 'pinia';
import { api } from '@/api';
import type { RegisterResponse } from '@/api/register';
import type { ErrorData, LoginData, RegisterData } from '@/type/auth';

interface AuthState {
  isAuth: boolean,
  result: Partial<RegisterData> | undefined,
  error: ErrorData | undefined,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
    result: undefined,
    error: undefined,
  }),
  actions: {
    async login(user: LoginData) {
      this.error = undefined;
      return new Promise((resolve) => {
        api.login(user)
          .then((response) => {
            if (response.non_field_errors) {
              this.error = response.non_field_errors;
            }

            if (response.token) {
              this.isAuth = true;
              this.setToken(response.token);
            }

            resolve(response);
          })
      });
    },
    async register(user: RegisterData) {
      this.error = undefined;
      this.result = undefined;
      return new Promise((resolve) => {
        api.register(user)
          .then((response: RegisterResponse) => {
            this.result = response.result;
            this.error = response.error;
            resolve(response);
          })
      });
    },
    setToken(token: string): void {
      localStorage.setItem('token', token);
    },
    async authToken(): Promise<void> {
      if (localStorage.getItem('token') !== null) {
        this.isAuth = true;
      }
    },
    clearError(field: keyof ErrorData): void {
      if (this.error !== undefined) {
        this.error[field] = undefined;
      }
    }
  },
});

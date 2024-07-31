import { defineStore } from 'pinia';
import { api } from "@/api";
import type { RegisterData } from "@/pages/SignUpView.vue";
import type { RegisterResponse } from "@/api/register";

export interface ErrorData {
  username: string[] | undefined,
  email: string[] | undefined,
  password: string[] | undefined,
}

interface AuthState {
  result: Partial<RegisterData> | undefined,
  error: ErrorData | undefined,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    result: undefined,
    error: undefined,
  }),
  actions: {
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
    clearError(field: keyof ErrorData): void {
      if (this.error !== undefined) {
        this.error[field] = undefined;
      }
    }
  },
});

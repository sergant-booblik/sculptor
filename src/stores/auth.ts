import { defineStore } from 'pinia';
import { api } from "@/api";
import type { RegisterData } from "@/pages/SignUpView.vue";

interface AuthState {
  result: unknown,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    result: undefined,
  }),
  actions: {
    async register(user: RegisterData) {
      return new Promise((resolve) => {
        api.register(user)
          .then((response) => {
            this.result = response;
            resolve(response);
          })
      });
    },
  },
});

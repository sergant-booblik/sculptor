import { defineStore } from 'pinia';
import { api } from '@/api';
import type { Category } from '@/type/quiz';

interface CategoryState {
  categories: Category[] | undefined,
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: undefined,
  }),
  actions: {
    async fetchCategories() {
      return new Promise((resolve, reject) => {
        api.fetchCategories()
          .then((response) => {
            this.categories = response.results;

            resolve(response);
          }).catch((error) => reject(error));
      });
    },
  },
});

import { defineStore } from 'pinia';
import { api } from '@/api'

export interface Product {
  id: number,
  name: string,
  description: string,
  price: string,
  quantity: number,
  image: string,
  category: number,
}

export interface ProductState {
  products: Product[],
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
  }),
  actions: {
    fetchProducts() {
      return new Promise((resolve, reject) => {
        api.fetchProducts()
          .then((response) => {
            this.products = response;

            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
});

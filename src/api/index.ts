import {createFetchProductsFunction} from "@/api/fetch-products";
import type {Product} from "@/stores/product";
import {
  createRegisterFunction,
  type RegisterRequest,
  type RegisterResponse,
} from "@/api/register";

interface Api {
  fetchProducts: () => Promise<Product[]>;
  register: (request: RegisterRequest) => Promise<RegisterResponse>;
}

function createApi(): Api {
  const apiUrl = import.meta.env.VITE_API_URL;

  return {
    fetchProducts: createFetchProductsFunction(apiUrl),
    register: createRegisterFunction(apiUrl),
  }
}

export const api = createApi();

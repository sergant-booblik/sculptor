import {createFetchProductsFunction} from "@/api/fetch-products";
import type {Product} from "@/stores/product";

interface Api {
  fetchProducts: () => Promise<Product[]>;
}

function createApi(): Api {
  const apiUrl = 'http://localhost:8000/api';

  return {
    fetchProducts: createFetchProductsFunction(apiUrl),
  }
}

export const api = createApi();

import {createFetchProductsFunction} from "@/api/fetch-products";
import type {Product} from "@/stores/product";

interface Api {
  fetchProducts: () => Promise<Product[]>;
}

function createApi(): Api {
  const apiUrl = import.meta.env.API_URL;

  return {
    fetchProducts: createFetchProductsFunction(apiUrl),
  }
}

export const api = createApi();

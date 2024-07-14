import type {Product} from "@/stores/product";

export function createFetchProductsFunction(apiUrl: string): () => Promise<Product[]> {
  return (): Promise<Product[]> => {
    const url = new URL(`${apiUrl}/product-list`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((resp: Product[]) => resp);
  };
}

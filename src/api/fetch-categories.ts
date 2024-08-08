import type { Category } from "@/type/category";

export interface FetchCategoriesResponse {
  results: Category[],
}

export function createFetchCategoriesFunction(apiUrl: string): () => Promise<FetchCategoriesResponse> {
  return (): Promise<FetchCategoriesResponse> => {
    const url = new URL(`${apiUrl}/quiz/game-category/`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((result) => result);
  }
}

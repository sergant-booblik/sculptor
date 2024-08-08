import type { Quiz } from "@/type/quiz";

export interface FetchQuizResponse {
  results: Quiz[];
}

export interface FetchQuizRequest {
  categoryId?: string | undefined;
}

export function createFetchQuizFunction(apiUrl: string): (request: FetchQuizRequest) => Promise<FetchQuizResponse> {
  return (request: FetchQuizRequest): Promise<FetchQuizResponse> => {
    const url = new URL(`${apiUrl}/quiz/game/`);
    if (request.categoryId) url.searchParams.append('category', request.categoryId)
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((result) => result);
  }
}

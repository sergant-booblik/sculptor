import type { Question } from "@/type/question";

export interface FetchQuestionsResponse {
  results: Question[];
}

export function createFetchQuestionsFunction(apiUrl: string): () => Promise<FetchQuestionsResponse> {
  return (): Promise<FetchQuestionsResponse> => {
    const url = new URL(`${apiUrl}/quiz/question`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((result) => result);
  }
}

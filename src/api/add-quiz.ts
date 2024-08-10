import type { Quiz } from "@/type/quiz";

// export interface AddQuizResponse {
//   results: Quiz[];
// }

export interface AddQuizRequest {
  name: string,
  description: string,
  category?: number,
  user_id: number,
}

export function createAddQuizFunction(apiUrl: string): (request: AddQuizRequest) => Promise<Quiz> {
  return (request: AddQuizRequest): Promise<Quiz> => {
    const url = new URL(`${apiUrl}/quiz/game/`);
    const token = localStorage.getItem('token');
    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    }).then((resp) => resp.json())
      .then((result) => result);
  }
}

import type { ErrorData, RegisterData } from '@/type/auth';

export interface RegisterRequest {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export interface RegisterResponse {
  result?: Partial<RegisterData>,
  error?: ErrorData,
}

export function createRegisterFunction(apiUrl: string): (request: RegisterRequest) => Promise<RegisterResponse> {
  return (request: RegisterRequest): Promise<RegisterResponse> => {
    const url = new URL(`${apiUrl}/register/`);
    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((result): RegisterResponse => {
          return {
            result,
          }
        })
      }
      return resp.json().then((error): RegisterResponse => {
        return {
          error,
        }
      });
    });
  };
}

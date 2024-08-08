import type { ErrorData, LoginData } from "@/type/auth";

export interface LoginRequest extends LoginData {}

export interface LoginResponse {
  token?: string,
  non_field_errors?: ErrorData,
}

export function createLoginFunction(authUrl: string): (request: LoginRequest) => Promise<LoginResponse> {
  return (request: LoginRequest): Promise<LoginResponse> => {
    const url = new URL(`${authUrl}/api-token-auth/`);
    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((result): LoginResponse => result);
      }
      return resp.json().then((error): LoginResponse => error);
    });
  }
}

export interface RegisterRequest {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export interface RegisterResponse {}

export function createRegisterFunction(apiUrl: string): (request: RegisterRequest) => Promise<RegisterResponse> {
  return (request: RegisterRequest): Promise<RegisterResponse> => {
    const url = new URL(`${apiUrl}/register/`);
    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((resp: RegisterResponse) => resp);
  };
}

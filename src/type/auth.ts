export interface RegisterData {
  name: string,
  username: string,
  email: string,
  password: string,
}

export interface LoginData {
  username: string,
  password: string,
}

export interface ErrorData {
  username: string[] | undefined,
  email: string[] | undefined,
  password: string[] | undefined,
}

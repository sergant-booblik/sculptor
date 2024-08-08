export interface Category {
  id: number,
  name: string,
  description: string,
}

export interface Quiz {
  id: number,
  name: string,
  description: string,
  user_id: number,
  image: string,
  is_draft: boolean,
  question: string[],
}

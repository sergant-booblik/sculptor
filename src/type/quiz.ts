export interface Quiz {
  id: number,
  name: string,
  description: string,
  user_id: number,
  image: string,
  is_draft: boolean,
  question_count: number,
}

export interface ErrorData {
  name: string[] | undefined,
  user_id: string[] | undefined,
}

export interface Question {
  id: number,
  question: string,
  image: string,
  answers: Answer[],
  explanation: string,
  explanation_image: string,
  user_id: number,
  quiz_id: number,
}

export interface Answer {
  text: string,
  isTrue: boolean,
}

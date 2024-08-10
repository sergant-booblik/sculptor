import { defineStore } from 'pinia';
import { api } from '@/api';
import type { Quiz } from '@/type/quiz';
import type { AddQuizRequest } from "@/api/add-quiz";
import type { ErrorData } from "@/type/quiz";

interface QuizState {
  quiz?: Quiz[] | undefined,
  errors?: ErrorData | undefined,
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    quiz: undefined,
    errors: undefined,
  }),
  getters: {
    getCertainQuiz: (state: QuizState): (id: string | string[] | number) => Quiz | undefined => (id: string | string[] | number): Quiz | undefined => state.quiz?.find((quiz) => quiz.id === Number(id)),
  },
  actions: {
    async fetchQuiz(categoryId?: string) {
      return new Promise((resolve, reject) => {
        api.fetchQuiz({ categoryId })
          .then((response) => {
            this.quiz = response.results;

            resolve(response);
          }).catch((error) => reject(error));
      });
    },
    async addQuiz(request: AddQuizRequest) {
      this.errors = undefined;
      return new Promise((resolve) => {
        api.addQuiz(request)
          .then((response) => {
            // TODO bad
            if ('id' in response) {
              this.quiz?.push(response as Quiz);
            } else {
              this.errors = response as ErrorData;
            }


            resolve(response);
          });
      });
    },
    clearError(field: keyof ErrorData): void {
      if (this.errors !== undefined) {
        this.errors[field] = undefined;
      }
    }
  },
});

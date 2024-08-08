import { defineStore } from 'pinia';
import { api } from '@/api';
import type { Quiz } from '@/type/quiz';

interface QuizState {
  quiz: Quiz[] | undefined,
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    quiz: undefined,
  }),
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
  },
});

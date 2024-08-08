import { defineStore } from 'pinia';
import { api } from '@/api';
import type { Question } from "@/type/question";

interface QuestionState {
  questions: Question[] | undefined,
}

export const useQuestionStore = defineStore('question', {
  state: (): QuestionState => ({
    questions: undefined,
  }),
  actions: {
    async fetchQuestions() {
      return new Promise((resolve, reject) => {
        api.fetchQuestions()
          .then((response) => {
            this.questions = response.results;

            resolve(response);
          }).catch((error) => reject(error));
      });
    },
  },
});

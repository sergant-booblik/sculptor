import {
  createRegisterFunction,
  type RegisterRequest,
  type RegisterResponse,
} from '@/api/register';
import {
  createLoginFunction,
  type LoginRequest,
  type LoginResponse,
} from '@/api/auth';
import {
  createFetchCategoriesFunction,
  type FetchCategoriesResponse,
} from '@/api/fetch-categories';
import {
  createFetchQuizFunction,
  type FetchQuizRequest,
  type FetchQuizResponse,
} from "@/api/fetch-quiz";
import {
  createFetchQuestionsFunction,
  type FetchQuestionsResponse,
} from '@/api/fetch-questions';

interface Api {
  login: (request: LoginRequest) => Promise<LoginResponse>;
  register: (request: RegisterRequest) => Promise<RegisterResponse>;

  fetchCategories: () => Promise<FetchCategoriesResponse>;
  fetchQuiz: (request: FetchQuizRequest) => Promise<FetchQuizResponse>;
  fetchQuestions: () => Promise<FetchQuestionsResponse>;
}

function createApi(): Api {
  const authUrl = import.meta.env.VITE_API_URL;
  const apiUrl = `${import.meta.env.VITE_API_URL}/api`;

  return {
    login: createLoginFunction(authUrl),
    register: createRegisterFunction(apiUrl),

    fetchCategories: createFetchCategoriesFunction(apiUrl),
    fetchQuiz: createFetchQuizFunction(apiUrl),
    fetchQuestions: createFetchQuestionsFunction(apiUrl),
  }
}

export const api = createApi();

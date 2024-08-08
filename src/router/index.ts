import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue';
import { useAuthStore } from "@/stores/auth";
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import QuizView from "@/views/QuizView.vue";

interface RouteMeta extends RouteRecordNormalized {
  layout: LayoutType,
  auth?: boolean,
}

export enum LayoutType {
  EMPTY = 'EMPTY',
  MAIN = 'MAIN',
}

export enum RouteName {
  DASHBOARD = 'DASHBOARD',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  QUIZ = 'QUIZ',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.DASHBOARD,
    meta: { layout: LayoutType.MAIN, auth: true },
    component: DashboardView,
  },
  {
    path: '/sign-in',
    name: RouteName.SIGN_IN,
    meta: { layout: LayoutType.EMPTY, auth: false },
    component: SignInView,
  },
  {
    path: '/sign-up',
    name: RouteName.SIGN_UP,
    meta: { layout: LayoutType.EMPTY, auth: false },
    component: SignUpView,
  },
  {
    path: '/quiz',
    name: RouteName.QUIZ,
    meta: { layout: LayoutType.MAIN, auth: true },
    component: QuizView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.isAuth) {
    next();
    return;
  }
  authStore.authToken().then(() => {
    const isRequireAuth = to.matched.some((record) => record.meta.auth);
    const isUserAuthorize = authStore.isAuth;
    if (isRequireAuth && !isUserAuthorize) {
      next({ name: RouteName.SIGN_IN });
    } else {
      next();
    }
  });
});

export default router;

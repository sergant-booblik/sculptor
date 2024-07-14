import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import SignInView from '@/pages/SignInView.vue';
import SignUpView from '@/pages/SignUpView.vue';
import ShopView from "@/pages/ShopView.vue";

interface RouteMeta {
  layout: LayoutType,
}

export enum LayoutType {
  EMPTY = 'EMPTY',
  MAIN = 'MAIN',
}

export enum RouteName {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  HOME = 'HOME',
  ACCOUNT = 'ACCOUNT',
  SHOP = 'SHOP',
  SEARCH = 'SEARCH',
  PRODUCT = 'PRODUCT',
  CART = 'CART',
  CONTACT_US = 'CONTACT_US',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.HOME,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },
  {
    path: '/sign-in',
    name: RouteName.SIGN_IN,
    meta: { layout: LayoutType.EMPTY },
    component: SignInView,
  },
  {
    path: '/sign-up',
    name: RouteName.SIGN_UP,
    meta: { layout: LayoutType.EMPTY },
    component: SignUpView,
  },
  {
    path: '/shop',
    name: RouteName.SHOP,
    meta: { layout: LayoutType.MAIN },
    component: ShopView,
  },
  {
    path: '/account',
    name: RouteName.ACCOUNT,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },
  {
    path: '/search',
    name: RouteName.SEARCH,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },
  {
    path: '/product',
    name: RouteName.PRODUCT,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },
  {
    path: '/cart',
    name: RouteName.CART,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },
  {
    path: '/contact-us',
    name: RouteName.CONTACT_US,
    meta: { layout: LayoutType.MAIN },
    component: HomeView,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

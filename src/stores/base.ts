import { defineStore } from 'pinia'
import { RouteName } from "@/router";

interface BaseState {
  cartCounter: Number,
  menu: { text: string, page: RouteName }[];
  views: { id: number, name: string }[];
}

export const useBaseStore = defineStore('base',  {
  state: (): BaseState => ({
    cartCounter: 0,
    menu: [
      { text: 'Главная', page: RouteName.DASHBOARD },
      { text: 'Игры', page: RouteName.QUIZ },
    ],
    views: [
      { id: 0, name: 'grid' },
      { id: 1, name: 'side' },
    ],
  }),
})

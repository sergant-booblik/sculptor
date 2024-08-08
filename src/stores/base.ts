import { defineStore } from 'pinia'
import { RouteName } from "@/router";

interface BaseState {
  cartCounter: Number,
  menu: { text: string, page: RouteName }[];
}

export const useBaseStore = defineStore('base',  {
  state: (): BaseState => ({
    cartCounter: 0,
    menu: [
      { text: 'Home', page: RouteName.DASHBOARD },
      { text: 'Quiz', page: RouteName.QUIZ },
    ],
  }),
})

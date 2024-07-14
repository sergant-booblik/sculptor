import { defineStore } from 'pinia'

interface BaseState {
  cartCounter: Number,
}

export const useBaseStore = defineStore('base',  {
  state: (): BaseState => ({
    cartCounter: 0,
  }),
})

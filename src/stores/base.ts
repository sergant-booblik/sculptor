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
      { text: 'Home', page: RouteName.HOME },
      { text: 'Shop', page: RouteName.SHOP },
      { text: 'Product', page: RouteName.PRODUCT },
      { text: 'Contact Us', page: RouteName.CONTACT_US },
    ],
  }),
})

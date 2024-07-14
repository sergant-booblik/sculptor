<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link
        class="header__logo"
        :to="{ name: 'HOME' }"
      >
        <LogoIcon />
      </router-link>
      <div class="header__menu">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="header__menu-item"
        >
          <router-link
            class="header__menu-link"
            active-class="header__menu-link--active"
            :to="{ name: item.page }"
          >
            {{ item.text }}
          </router-link>
        </div>
      </div>
      <div class="header__navbar">
        <router-link
          class="header__navbar-item"
          :to="{ name: 'SEARCH' }"
        >
          <SearchIcon />
        </router-link>
        <router-link
          class="header__navbar-item"
         :to="{ name: 'SIGN_IN' }"
        >
          <AccountIcon />
        </router-link>
        <router-link
          class="header__navbar-item"
          :to="{ name: 'CART' }"
        >
          <CartIcon />
          <span class="header__cart-counter">
            {{ cartCounter }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import Icon from "@/components/icon";
import {useBaseStore} from "@/stores/base";
import {storeToRefs} from "pinia";

const HeaderSection = defineComponent({
  components: {
    LogoIcon: defineAsyncComponent(() => import('@/assets/logo.svg')),
    AccountIcon: Icon.AccountIcon,
    CartIcon: Icon.CartIcon,
    SearchIcon: Icon.SearchIcon,
  },
  setup() {
    const baseStore = useBaseStore();

    const { cartCounter } = storeToRefs(baseStore);

    const menuItems = [
      { text: 'Home', page: 'HOME' },
      { text: 'Shop', page: 'SHOP' },
      { text: 'Product', page: 'PRODUCT' },
      { text: 'Contact Us', page: 'CONTACT_US' },
    ];

    return {
      menuItems,
      cartCounter,
    }
  },
});

export default HeaderSection;
</script>

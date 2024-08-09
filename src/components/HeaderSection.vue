<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link
        class="header__logo"
        :to="{ name: 'DASHBOARD' }"
      >
        <img alt="logo" :src="LogoImage">
      </router-link>
      <div class="header__menu">
        <div
          v-for="item in menuItems"
          :key="item.page"
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
         :to="{ name: 'SIGN_IN' }"
        >
          <AccountIcon />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useBaseStore } from '@/stores/base';
import LogoImage from '@/assets/images/logo.png'
import Icon from '@/components/icon';

const HeaderSection = defineComponent({
  components: {
    AccountIcon: Icon.AccountIcon,
  },
  setup() {
    const baseStore = useBaseStore();

    const { cartCounter } = storeToRefs(baseStore);

    const menuItems = computed(() => baseStore.menu);

    return {
      LogoImage,
      menuItems,
      cartCounter,
    }
  },
});

export default HeaderSection;
</script>

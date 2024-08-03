<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__content">
        <div class="footer__logo">
          <span class="logo">
            <LogoIcon />
          </span>
          <p>Gift & Decoration Store</p>
        </div>
        <div class="footer__menu">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="footer__menu-item"
          >
            <router-link
              class="footer__menu-link"
              active-class="footer__menu-link--active"
              :to="{ name: item.page }"
            >
              {{ item.text }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="footer__bottom-bar">
        <div class="footer__copyright">
          <div class="copyright__text">
            Copyright © 2024 3legant. All rights reserved
          </div>
          <router-link
            :to="{ path: '#' }"
            class="copyright__link"
          >
            Privacy Policy
          </router-link>
          <router-link
            :to="{ path: '#' }"
            class="copyright__link"
          >
            Terms of use
          </router-link>
        </div>
        <div class="footer__social__icons">
          <div class="social__icon">
            <InstagramIcon />
          </div>
          <div class="social__icon">
            <FacebookIcon />
          </div>
          <div class="social__icon">
            <YoutubeIcon />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { useBaseStore } from '@/stores/base';
import Icon from "@/components/icon";

const FooterSection = defineComponent({
  components: {
    LogoIcon: defineAsyncComponent(() => import('@/assets/logo.svg')),
    InstagramIcon: Icon.InstagramIcon,
    FacebookIcon: Icon.FacebookIcon,
    YoutubeIcon: Icon.YoutubeIcon,
  },
  setup() {
    const baseStore = useBaseStore();

    const menuItems = computed(() => baseStore.menu)

    return {
      menuItems,
    }
  },
});

export default FooterSection;
</script>

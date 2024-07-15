<template>
  <section class="banner">
    <div class="banner__wrapper">
      <div
        class="banner__image"
        :style="{ backgroundImage: `url(${BannerImage})` }"
      >
      </div>
      <div class="banner__body">
        <div class="banner__tagline">
          Sale up to 35% off
        </div>
        <h4 class="banner__title">
          HUNDREDS of New lower prices!
        </h4>
        <div class="banner__subtitle">
          It’s more affordable than ever to give every room in your home a stylish makeover
        </div>
        <ButtonComponent
          label="Shop Now"
          type="link"
          color="dark"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from "@/components/ButtonComponent.vue";
import BannerImage from '@/assets/banner-image.png';

const BannerSection = defineComponent({
  components: {
    ButtonComponent,
  },
  setup() {
    return {
      BannerImage,
    };
  },
});

export default BannerSection;
</script>

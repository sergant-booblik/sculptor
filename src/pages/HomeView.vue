<template>
  <SliderSection />
  <BannerGridSection />
  <ProductCarousel />
  <ValuesSection />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SliderSection from '@/components/SliderSection.vue';
import BannerGridSection from '@/components/BannerGridSection.vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import ValuesSection from '@/components/ValuesSection.vue';

const HomeView = defineComponent({
  components: {
    SliderSection,
    BannerGridSection,
    ProductCarousel,
    ValuesSection,
  },
});

export default HomeView;
</script>

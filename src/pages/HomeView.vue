<template>
  <SliderSection />
  <BannerGridSection />
  <ProductCarousel />
  <ValuesSection />
  <BannerSection />
  <ArticlesSection />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticlesSection from '@/components/ArticlesSection.vue';
import SliderSection from '@/components/SliderSection.vue';
import BannerGridSection from '@/components/BannerGridSection.vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import ValuesSection from '@/components/ValuesSection.vue';
import BannerSection from '@/components/BannerSection.vue';

const HomeView = defineComponent({
  components: {
    ArticlesSection,
    BannerGridSection,
    BannerSection,
    ProductCarousel,
    SliderSection,
    ValuesSection,
  },
});

export default HomeView;
</script>

<template>
  <section class="slider">
    <div class="slider__wrapper">
      <div
        class="slider__items"
        :style="slidesStyle"
      >
        <div
          v-for="index in slides"
          :key="index"
          class="slider__item"
        >
          <img :src="sliderImage"/>
        </div>
      </div>
      <div class="slider-controls">
        <div
          v-show="currentSlideIndex > 0"
          class="slider-control slider-control--prev"
          role="button"
          @click="changeSlide(currentSlideIndex - 1)"
        >
          <SliderControlPrevIcon />
        </div>
        <div
          v-show="currentSlideIndex < slides.length - 1"
          class="slider-control slider-control--next"
          role="button"
          @click="changeSlide(currentSlideIndex + 1)"
        >
          <SliderControlNextIcon />
        </div>
      </div>
      <div class="slider-dots">
        <div
          v-for="index in slides"
          :key="index"
          :class="[
            'slider-dot',
            { 'slider-dot--active': index === currentSlideIndex }
          ]"
        />
      </div>
    </div>
    <div class="slider__text-wrapper">
      <h1 class="slider__title">
        Simply Unique<span class="text-gray">/</span>
        Simply Better<span class="text-gray">.</span>
      </h1>
      <p class="slider__description">
        <span class="bold">3legant</span> is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import sliderImage from '@/assets/slide-image.png';
import Icon from '@/components/icon';

enum Direction {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

const SliderSection = defineComponent({
  components: {
    SliderControlPrevIcon: Icon.SliderControlPrevIcon,
    SliderControlNextIcon: Icon.SliderControlNextIcon,
  },
  setup() {
    const slides = [0, 1, 2];

    const currentSlideIndex = ref(0);

    const changeSlide = (toSlide: number) => {
      currentSlideIndex.value = toSlide;
    };

    const slidesStyle = computed(() => ({
      left: `${currentSlideIndex.value * -100}%`
    }))

    return {
      slides,
      sliderImage,
      currentSlideIndex,
      changeSlide,
      slidesStyle,
    }
  },
});

export default SliderSection;
</script>

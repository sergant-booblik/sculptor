<template>
  <section class="carousel">
    <div class="carousel__wrapper">
      <div
        ref="containerRef"
        class="carousel__header"
      >
        <h4>
          New<br>
          Arrivals
        </h4>
        <ButtonComponent
          label="More products"
          type="link"
          color="dark"
        />
      </div>
      <div
        ref="carouselItemsRef"
        class="carousel__items"
        :style="containerStyle"
      >
        <div
          v-for="(product, index) in products"
          :key="index"
          class="carousel__item"
        >
          <div class="card">
            <div class="card__top">
              <div class="card__labels">
                <div
                  :class="[
                    'card__label',
                    'card__label--sale',
                  ]"
                >
                  {{ '-50%' }}
                </div>
              </div>
            </div>
            <img
              class="card__image"
              :src="product.image"
            >
            <div class="card__bottom">
              <ButtonComponent
                flex
                color="dark"
                label="Add to cart"
              />
            </div>
          </div>
          <div class="carousel-item__rating">
            {{ product.category }}
          </div>
          <div class="carousel-item__name">
            {{ product.name }}
          </div>
          <div class="carousel-item__name">
            {{ product.description }}
          </div>
          <div class="carousel-item__price">
            <span class="carousel-item__new-price">{{ product.price }}</span>
          </div>
        </div>
      </div>
      <div class="carousel__scrollbar">
        <div class="carousel__track">
          <div
            class="carousel__thumb"
            :style="scrollbarThumbStyle"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, StyleValue } from 'vue';
import ProductImage from '@/assets/products';
import ButtonComponent from '@/components/ButtonComponent.vue';
import {useProductStore} from "@/stores/product";
import {storeToRefs} from "pinia";

enum LabelType {
  REGULAR = 'regular',
  SALE = 'sale',
}

const ProductCarousel2 = defineComponent({
  components: {
    ButtonComponent,
  },
  setup() {
    const productStore = useProductStore();

    const { products } = storeToRefs(productStore);

    const carouselItemsRef = ref<HTMLElement>();
    const containerRef = ref<HTMLElement>();

    const containerStyle = ref<StyleValue>();
    const scrollbarThumbStyle = reactive<StyleValue>({ width: '0px', left: '12px' });

    const containerPadding = ref(32);

    const calculatePadding = () => {
      containerPadding.value = containerRef.value?.getBoundingClientRect().left + 32;
      containerStyle.value = { padding: `0 ${containerPadding.value}px` };
    };


    // TODO Rewrite it!
    const calculateScrollbarThumbStyle = () => {
      const containerWidth = containerRef.value?.offsetWidth;
      const carouselItemsWidth = carouselItemsRef.value?.scrollWidth;
      const scrollTrackLeftCoefficient = containerWidth / carouselItemsWidth;
      const scrollbarThumbWidthCoefficient = containerWidth / carouselItemsWidth;
      const scrollbarThumbWidth = containerWidth * scrollbarThumbWidthCoefficient;
      scrollbarThumbStyle.width = `${scrollbarThumbWidth}px`;
      scrollbarThumbStyle.left = `${carouselItemsRef.value?.scrollLeft * scrollTrackLeftCoefficient}px`
    };

    window.addEventListener('resize', () => {
      calculatePadding();
      calculateScrollbarThumbStyle();
    });

    onMounted(() => {
      calculatePadding();
      calculateScrollbarThumbStyle();

      carouselItemsRef.value?.addEventListener('scroll', () => {
        calculateScrollbarThumbStyle();
      });
    });

    onMounted(() => {
      productStore.fetchProducts();
    });

    return {
      products,
      containerRef,
      carouselItemsRef,
      containerStyle,
      scrollbarThumbStyle,
    };
  },
});

export default ProductCarousel2;
</script>

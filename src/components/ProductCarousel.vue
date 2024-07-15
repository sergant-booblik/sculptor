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
              <div
                v-if="product.labels"
                class="card__labels"
              >
                <div
                  :class="[
                    'card__label',
                    `card__label--${label.type}`,
                  ]"
                  v-for="(label, index) in product.labels"
                  :key="index"
                >
                  {{ label.text }}
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
          <div class="carousel-item__info">
            <div class="carousel-item__rating">
              <div
                v-for="index in 5"
                :key="index"
                :class="[
                  'rating__star',
                  product.rating < index ? 'rating__star--empty' : 'rating__star--full',
                ]"
              />
            </div>
            <div class="carousel-item__name">
              {{ product.name }}
            </div>
            <div class="carousel-item__price">
              <span class="carousel-item__new-price">{{ product.price }}</span>
              <span class="carousel-item__old-price">{{ product.oldPrice }}</span>
            </div>
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
import Icon from '@/components/icon';

enum LabelType {
  REGULAR = 'regular',
  SALE = 'sale',
}

const ProductCarousel = defineComponent({
  components: {
    ButtonComponent,
  },
  setup() {
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

    const products = [
      {
        name: 'Loveseat Sofa',
        price: '$199.00',
        oldPrice: '$400.00',
        labels: [{ text: '-50%', type: LabelType.SALE }, { text: 'NEW', type: LabelType.REGULAR }],
        rating: 5,
        image: ProductImage.Product1,
      },
      {
        name: 'Table Lamp',
        price: '$39.99',
        oldPrice: '$80.00',
        labels: [{ text: '-50%', type: LabelType.SALE }],
        rating: 4,
        image: ProductImage.Product2,
      },
      {
        name: 'Beige Table Lamp',
        price: '$19.00',
        labels: [{ text: 'NEW', type: LabelType.REGULAR }],
        rating: 3,
        image: ProductImage.Product3,
      },
      {
        name: 'Bamboo basket',
        price: '$24.99',
        rating: 2,
        image: ProductImage.Product4,
      },
      {
        name: 'Toasted',
        oldPrice: '$50.00',
        price: '$24.99',
        labels: [{ text: '-50%', type: LabelType.SALE }],
        rating: 1,
        image: ProductImage.Product5,
      },
      {
        name: 'Black Tray table',
        price: '$19.19',
        rating: 0,
        image: ProductImage.Product6,
      },
      {
        name: 'Lamp',
        price: '$39.00',
        rating: 3,
        image: ProductImage.Product7,
      },
      {
        name: 'Light Beige Pillow',
        price: '$3.99',
        rating: 5,
        image: ProductImage.Product8,
      },
      {
        name: 'Red Tray table',
        price: '$19.19',
        rating: 2,
        image: ProductImage.Product9,
      },

    ];

    return {
      products,
      containerRef,
      carouselItemsRef,
      containerStyle,
      scrollbarThumbStyle,
    };
  },
});

export default ProductCarousel;
</script>

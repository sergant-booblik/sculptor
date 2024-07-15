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
        <div class="carousel__controls">
          <div
            class="carousel__control carousel__control--prev"
            @click="scrollCard(currentCardIndex - 1)"
          >
            <SliderControlPrevIcon />
          </div>
          <div
            class="carousel__control carousel__control--next"
            @click="scrollCard(currentCardIndex + 1)"
          >
            <SliderControlNextIcon />
          </div>
        </div>
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
          <div
            ref="cardRef"
            class="card"
          >
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
        <div class="carousel__item carousel__item--more">
          <div class="card">
            <ButtonComponent
              type="link"
              color="dark"
              label="See all products"
            />
          </div>
          <div class="carousel-item__info" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
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
    SliderControlPrevIcon: Icon.SliderControlPrevIcon,
    SliderControlNextIcon: Icon.SliderControlNextIcon,
  },
  setup() {
    const carouselItemsRef = ref<HTMLElement>();
    const containerRef = ref<HTMLElement>();
    const cardRef = ref<HTMLElement[]>();

    const containerStyle = reactive({ padding: '0 0', scrollPaddingLeft: '0px' });

    const containerPadding = ref(32);

    const currentCardIndex = ref(0);

    const cardWidth = ref(0);

    const scrollCard = (toCard: number) => {
      const scrollDirection = toCard - currentCardIndex.value;
      const scrollOffset = ((cardWidth.value + 24) * scrollDirection);
      const currentScrollPosition = (carouselItemsRef.value?.scrollLeft ?? 0);
      carouselItemsRef.value?.scrollTo({
        left: scrollOffset + currentScrollPosition,
        behavior: 'smooth',
      });
      currentCardIndex.value = toCard;
    };

    const calculatePadding = () => {
      containerPadding.value = (containerRef.value?.getBoundingClientRect().left ?? 0) + 32;
      containerStyle.padding = `0 ${containerPadding.value}px`;
      containerStyle.scrollPaddingLeft = `${containerPadding.value}px`;
    };

    window.addEventListener('resize', () => {
      calculatePadding();
    });

    onMounted(() => {
      calculatePadding();
      if (cardRef.value) {
        cardWidth.value = cardRef.value[0].offsetWidth ?? 0;
      }
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
      cardRef,
      currentCardIndex,
      containerStyle,
      scrollCard,
    };
  },
});

export default ProductCarousel;
</script>

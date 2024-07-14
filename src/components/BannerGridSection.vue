<template>
  <section class="banner-grid">
    <div
      v-for="(product, index) in products"
      :key="index"
      :class="[
        'product-card',
        `product-card--${product.size}`,
      ]"
      :style="{ backgroundImage: `url(${product.image})` }"
    >
      <div class="product-text">
        <h5 class="product-title">{{ product.name }}</h5>
        <ButtonComponent
          label="Shop Now"
          type="link"
          color="dark"
          @click="navigateToShop"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BigCardImage from '@/assets/living-room.png';
import MidCardImageKitchen from '@/assets/kitchen.png';
import MidCardImageBedroom from '@/assets/bedroom.png';
import ButtonComponent from "@/components/ButtonComponent.vue";

enum CardSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

const BannerGridSection = defineComponent({
  components: {ButtonComponent},
  setup() {
    const products = [
      { image: BigCardImage, name: 'Living Room', size: CardSize.LARGE },
      { image: MidCardImageBedroom, name: 'Bedroom', size: CardSize.MEDIUM },
      { image: MidCardImageKitchen, name: 'Kitchen', size: CardSize.MEDIUM },
    ]

    const navigateToShop = () => {
      window.open('/shop', '_self');
    }

    return {
      products,
      navigateToShop,
    };
  },
});

export default BannerGridSection;
</script>



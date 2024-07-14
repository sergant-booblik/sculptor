<template>
  <ProductCarousel2 />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ProductCarousel2 from "@/components/ProductCarousel2.vue";

const ShopView = defineComponent({
  components: {ProductCarousel2}
});

export default ShopView;
</script>

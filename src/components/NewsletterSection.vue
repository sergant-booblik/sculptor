<template>
  <div class="newsletter">
    <div
      class="newsletter__wrapper"
      :style="{ backgroundImage: `url(${NewsletterBackgroundImage})` }"
    >
      <div class="newsletter__body">
        <h4 class="newsletter__title" v-text="'Join our Newsletter'" />
        <div class="newsletter__subtitle" v-text="'Sign up for deals, new products and promotions'" />
        <InputComponent
          color="brown"
          placeholder="Email address"
          prepend-icon="envelope-icon"
          append-text="Send"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputComponent from "@/components/InputComponent.vue";
import NewsletterBackgroundImage from '@/assets/newsletter-background.png';

const NewsletterSection = defineComponent({
  components: {
    InputComponent,
  },
  setup() {
    return {
      NewsletterBackgroundImage,
    }
  },
});

export default NewsletterSection;
</script>

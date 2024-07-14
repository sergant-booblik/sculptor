<template>
  <section
    v-if="show"
    class="announcement-bar"
    id="announcement-bar"
  >
    <div class="announcement-bar__wrapper">
      <div class="announcement-bar__icon">
        <TicketPercentIcon />
      </div>
      <div class="announcement-bar__text">
        30% off storewide — Limited time!
      </div>
      <ButtonComponent
        label="Shop now"
        type="link"
        color="primary"
        @click="navigateToShop"
      />
      <div
        class="announcement-bar__close"
        role="button"
        @click="close"
      >
        <CloseIcon />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import Icon from '@/components/icon';
import ButtonComponent from '@/components/ButtonComponent.vue';

function useClose(show: Ref<boolean>): () => void {
  function close(): void {
    show.value = false;
  }

  return close;
}

const NotifySection = defineComponent({
  components: {
    ButtonComponent,
    CloseIcon: Icon.CloseIcon,
    TicketPercentIcon: Icon.TicketPercentIcon,
  },
  setup() {
    const show = ref(true);

    const close = useClose(show);

    const navigateToShop = () => {
      window.open('/', '_self');
    }

    return {
      show,
      close,
      navigateToShop,
    }
  },
});

export default NotifySection;
</script>

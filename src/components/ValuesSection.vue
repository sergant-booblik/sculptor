<template>
  <section class="values">
    <div class="values__wrapper">
      <div class="values__cards">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="value__card"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/icon';

const ValuesSection = defineComponent({
  setup() {
    const values = [
      { title: 'Free Shipping', subtitle: 'Order above $200', icon: Icon.DeliveryIcon },
      { title: 'Money-back', subtitle: '30 days guarantee', icon: Icon.MoneyIcon },
      { title: 'Secure Payments', subtitle: 'Secured by Stripe', icon: Icon.LockIcon },
      { title: '24/7 Support', subtitle: 'Phone and Email support', icon: Icon.CallIcon },
    ]

    return {
      values,
    };
  },
});

export default ValuesSection;
</script>

<template>
  <div
    :class="[
      'alert',
      `alert--${color}`,
    ]"
  >
    <div class="alert__wrapper">
      <div class="alert__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export enum AlertColor {
  SUCCESS = 'success'
}

const AlertComponent = defineComponent({
  props: {
    color: {
      required: true,
      type: String as PropType<AlertColor>,
    },
  },
});

export default AlertComponent;
</script>

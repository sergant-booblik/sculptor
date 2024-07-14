<template>
  <button
    :class="[
      'button',
      `button--${type}`,
      `button--${color}`,
      {'button--flex': flex},
    ]"
    @click="$emit('click')"
  >
    {{ label }}
    <ArrowRightIcon v-if="type === 'link'" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Icon from "@/components/icon";

export enum ButtonType {
  SOLID = 'solid',
  LINK = 'link',
}

export enum ButtonColor {
  PRIMARY = 'primary',
  DARK = 'dark',
}

const ButtonComponent = defineComponent({
  components: {
    ArrowRightIcon: Icon.ArrowRightIcon,
  },
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: ButtonType.SOLID,
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: ButtonColor.PRIMARY,
    },
    flex: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
});

export default ButtonComponent;
</script>

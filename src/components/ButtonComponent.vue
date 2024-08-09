<template>
  <button
    :class="[
      'button',
      `button--${type}`,
      `button--${color}`,
      {'button--flex': flex},
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <component
      v-if="prependIcon"
      :is="prependIcon"
    />
    {{ label }}
    <component
      v-if="appendIcon"
      :is="appendIcon"
    />
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
  SECONDARY = 'secondary',
  DARK = 'dark',
  DANGER = 'danger',
}

const ButtonComponent = defineComponent({
  components: {
    ...Icon,
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
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    appendIcon: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click'],
});

export default ButtonComponent;
</script>

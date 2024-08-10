<template>
  {{ label }}
  <div :class="[
    'select-group',
    { 'select-group--flex': flex },
  ]">
    <select
      v-model="selectedValue"
      class="select"
    >
      <option
        v-for="choice in choices"
        :key="choice.key"
        :value="choice.key"
        :disabled="!choice.enabled"
      >
        {{ choice.value }}
      </option>
    </select>
    <div class="select__wrap">
      <input
        :value="selectedChoice?.value"
        :placeholder="placeholder"
      />
      <ArrowDownSmallIcon />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import Icon from '@/components/icon';

export interface SelectChoice {
  key: number | string | undefined,
  value: string,
  enabled: boolean,
}

const SelectComponent = defineComponent({
  components: {
    ArrowDownSmallIcon: Icon.ArrowDownSmallIcon,
  },
  props: {
    modelValue: {
      type: Number,
      default: undefined,
    },
    choices: {
      type: Array as PropType<SelectChoice[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    flex: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    const selectedChoice = computed(() => props.choices.find((choice) => choice.key === selectedValue.value));

    return {
      selectedValue,
      selectedChoice,
    };
  },
});

export default SelectComponent;
</script>

<style scoped lang="scss">
.select-group {
  @apply relative;
  @apply w-fit;
  @apply px-2 py-1;
  @apply border border-slate-950;

  &--flex {
    @apply w-full;
  }
}

.select {
  @apply absolute top-0 left-0;
  @apply w-full h-full;
  @apply opacity-0;
}

.select__wrap {
  @apply flex justify-between;
}
</style>

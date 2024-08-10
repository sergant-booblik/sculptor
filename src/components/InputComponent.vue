<template>
  <div class="input-group">
    <label>
      {{ label }}
    </label>
    <div class="input__wrapper">
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input"
      />
    </div>
    <ul class="input__error">
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string | number,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  errors?: string[],
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  placeholder: undefined,
  disabled: false,
  errors: undefined,
});

const emit = defineEmits(['update:modelValue', 'change']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change');
  },
});

</script>

<style scoped lang="scss">
  .input-group {
    @apply mt-2 mb-5;
  }

  .input {
    @apply w-full;
    @apply px-2 py-1;
    @apply border border-slate-500;
  }

  .input__error {
    @apply absolute;
    @apply text-xs;
    @apply text-red-700;

    li {
      animation: shake 150ms;
    }
  }
</style>

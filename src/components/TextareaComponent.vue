<template>
  <div class="textarea-group">
    <label>
      {{ label }}
    </label>
    <div class="input__wrapper">
      <textarea
        v-model="inputValue"
        :placeholder="placeholder"
        class="textarea"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string,
  label?: string,
  placeholder?: string,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  placeholder: undefined,
});

const emit = defineEmits<{(event: 'update:modelValue', value: string | undefined): void}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});

</script>

<style scoped lang="scss">
.textarea-group {
  @apply my-1;
}

.textarea {
  @apply w-full;
  @apply px-2 py-1;
  @apply border border-slate-500;
}
</style>

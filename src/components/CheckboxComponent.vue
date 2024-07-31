<template>
  <div class="checkbox-group">
    <label class="checkbox__container">
      <input
        type="checkbox"
        v-model="checked"
      />
      <span class="checkmark" />
      <span
        class="text"
        v-html="label"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

const InputComponent = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checked = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      checked,
    };
  },
});

export default InputComponent;
</script>

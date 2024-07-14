<template>
  <div class="checkbox-group">
    <label class="checkbox__container">
      <input type="checkbox"/>
      <span class="checkmark" />
      <span
        class="text"
        v-html="label"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const InputComponent = defineComponent({
  props: {
    label: {
      type: String,
      default: undefined,
    },
  },
});

export default InputComponent;
</script>

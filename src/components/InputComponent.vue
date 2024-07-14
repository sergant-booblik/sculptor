<template>
  <div class="input-group">
    <label>
      {{ label }}
    </label>
    <input
      :type="calculateType"
      :placeholder="placeholder"
    />
    <EyeIcon
      v-if="type === 'password'"
      role="button"
      class="last-icon"
      @click="changePasswordVisibility"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import Icon from '@/components/icon';

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

const InputComponent = defineComponent({
  components: {
    EyeIcon: Icon.EyeIcon,
  },
  props: {
    label: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String as PropType<any>,
      default: InputType.TEXT,
    },
  },
  setup(props) {
    const { type } = toRefs(props)

    const isPasswordVisible = ref(false);

    const calculateType = computed(() => {
      if (type.value === InputType.PASSWORD && isPasswordVisible.value) {
        return InputType.TEXT;
      }

      return type.value;
    });

    const changePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    return {
      calculateType,
      changePasswordVisibility,
    };
  },
});

export default InputComponent;
</script>

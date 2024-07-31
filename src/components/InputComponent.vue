<template>
  <div class="input-group">
    <label>
      {{ label }}
    </label>
    <input
      v-model="inputValue"
      :type="calculateType"
      :placeholder="placeholder"
      @input="debounceInput"
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
  EMAIL = 'email',
  PASSWORD = 'password',
}

const InputComponent = defineComponent({
  components: {
    EyeIcon: Icon.EyeIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: 'undefined',
    },
    label: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String as PropType<InputType>,
      default: InputType.TEXT,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { type } = toRefs(props)

    const isPasswordVisible = ref(false);

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

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
      inputValue,
      calculateType,
      changePasswordVisibility,
    };
  },
});

export default InputComponent;
</script>

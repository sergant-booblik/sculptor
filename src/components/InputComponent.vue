<template>
  <div
    :class="[
      'input-group',
      { 'input-group--invalid': errors }
    ]"
  >
    <label>
      {{ label }}
    </label>
    <input
      v-model="inputValue"
      :type="calculateType"
      :placeholder="placeholder"
    />
    <EyeIcon
      v-if="type === 'password'"
      role="button"
      class="last-icon"
      @click="changePasswordVisibility"
    />
    <ul class="input-error">
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
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
    errors: {
      type: Array as PropType<String[]>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { type } = toRefs(props)

    const isPasswordVisible = ref(false);

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
        emit('change');
      },
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

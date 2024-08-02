<template>
  <div
    :class="[
      'input-group',
      `input-group--${color}`,
      { 'input-group--invalid': errors },
    ]"
  >
    <label>
      {{ label }}
    </label>
    <div class="input__wrapper">
      <component
        v-if="prependIcon"
        :is="prependIcon"
        class="first-element"
      />
      <input
        v-model="inputValue"
        :type="calculateType"
        :placeholder="placeholder"
      />
      <div
        role="button"
        @click="$emit('clickInputButton')"
        class="last-element"
      >
        <component
          v-if="appendIcon"
          :is="appendIcon"
          class="last-icon"
        />
        <span
          v-if="appendText"
          class="last-text"
        >
        {{ appendText }}
      </span>
      </div>
    </div>
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

export enum InputColor {
  LIGHT = 'light',
  DARK = 'dark',
}

const InputComponent = defineComponent({
  components: {
    ...Icon,
  },
  props: {
    modelValue: {
      type: String,
      default: undefined,
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
    color: {
      type: String as PropType<InputColor>,
      default: InputColor.LIGHT,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    appendIcon: {
      type: String,
      default: undefined,
    },
    appendText: {
      type: String,
      default: undefined,
    },
    errors: {
      type: Array as PropType<String[]>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'change', 'clickInputButton'],
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

    return {
      inputValue,
      calculateType,
    };
  },
});

export default InputComponent;
</script>

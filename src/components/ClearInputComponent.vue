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

const ClearInputComponent = defineComponent({
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

export default ClearInputComponent;
</script>

<style scoped lang="scss">
.input-group {
  @apply relative;

  &--light {
    .input__wrapper {
      @apply border-slate-100;
    }

    input {
      &::placeholder {
        @apply text-slate-500;
      }
    }

    .first-element,
    .last-element {
      @apply text-slate-500;
    }
  }

  &--brown {
    .input__wrapper {
      @apply border-b-stone-500;
    }

    input {
      &::placeholder {
        @apply text-stone-500;
      }
    }

    .first-element,
    .last-element {
      @apply text-stone-500;
    }
  }

  input {
    @apply z-10;
    @apply w-full;
    @apply py-2 px-1;
    @apply bg-transparent;
    @apply outline-0;
  }

  .input__wrapper {
    @apply flex items-end gap-1;
    @apply ps-1 pe-2;
    @apply border-b-2;
  }

  .first-element,
  .last-element {
    @apply shrink-0;
    @apply mb-2;
  }

  .last-element {
    @apply flex items-center gap-1;
  }

  .input-error {
    @apply absolute;
    @apply mt-2;
    @apply text-xs text-red-700;

    li {
      animation: shake 150ms;
    }
  }

  &--invalid {
    .input__wrapper {
      @apply border-red-700;
    }

    input {
      @apply text-red-700;
      @apply outline-0;

      &::placeholder {
        @apply text-red-700;
      }
    }
  }
}

</style>

<template>
  <main class="sign-page">
    <div
      class="sign-page__cover"
      :style="{ backgroundImage: `url(${CoverImage})` }"
    >
    </div>
    <div class="sign-page__body">
      <h4 class="sign-page-body__title">
        Sign up
      </h4>
      <p class="sign-page-body__subtitle">
        Already have an account?
        <router-link
          class="sign-page-body__link"
          :to="{ name: 'SIGN_IN' }"
        >
          Sign in
        </router-link>
      </p>
      <form
        class="auth-form"
        @submit.prevent="register"
      >
        <InputComponent
          v-model="user.name"
          placeholder="Your name"
          type="text"
        />
        <InputComponent
          v-model="user.username"
          :errors="error?.username"
          placeholder="Username"
          type="text"
          @change="clearError('username')"
        />
        <InputComponent
          v-model="user.email"
          :errors="error?.email"
          placeholder="Email address"
          type="email"
          @change="clearError('email')"
        />
        <InputComponent
          v-model="user.password"
          :errors="error?.password"
          placeholder="Password"
          type="password"
          @change="clearError('password')"
        />
        <CheckboxComponent
          v-model="isAgreeWithPolicies"
          label="I agree with <a href='#'>Privacy Policy</a href='#'> and <a>Terms of Use</a>"
        />
        <ButtonComponent
          flex
          color="dark"
          label="Submit"
          :disabled="!isFormCanBeSubmitted"
          @click.prevent="register"
        />
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';
import CoverImage from '@/assets/cover.png';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { type ErrorData, useAuthStore } from '@/stores/auth';
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { RouteName } from "@/router";

export interface RegisterData {
  name: string,
  username: string,
  email: string,
  password: string,
}

const SignView = defineComponent({
  components: {
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const { result, error } = storeToRefs(authStore);

    const user = ref<RegisterData>({
      name: '',
      username: '',
      email: '',
      password: '',
    });

    const isAgreeWithPolicies = ref(false);

    const isRegisteredSuccess = computed(() => result.value !== undefined);

    function register(): void {
      authStore.register(user.value).then(() => {
        if (isRegisteredSuccess.value) {
          router.push({ name: RouteName.SIGN_IN, query: { 'successful-registered': 'true' } })
        }
      })
    }

    const clearError = (field: keyof ErrorData) => {
      authStore.clearError(field);
    };

    const isFormCanBeSubmitted = computed(() => {
      return user.value.name !== ''
        && user.value.username !== ''
        && user.value.email !== ''
        && user.value.password !== ''
        && isAgreeWithPolicies.value;
    });

    return {
      CoverImage,
      user,
      result,
      error,
      register,
      isAgreeWithPolicies,
      isFormCanBeSubmitted,
      clearError,
    };
  },
});

export default SignView;
</script>

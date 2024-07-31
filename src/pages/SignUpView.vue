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
          placeholder="Username"
          type="text"
        />
        <InputComponent
          v-model="user.email"
          placeholder="Email address"
          type="email"
        />
        <InputComponent
          v-model="user.password"
          placeholder="Password"
          type="password"
        />
        <CheckboxComponent
          label="I agree with <a href='#'>Privacy Policy</a href='#'> and <a>Terms of Use</a>"
        />
        <ButtonComponent
          flex
          color="dark"
          label="Submit"
          @click.prevent="register"
        />
      </form>
      <div class="mt-8">
        {{ result }}
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';
import CoverImage from '@/assets/cover.png';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from "pinia";

export interface RegisterData {
  name: string,
  username: string,
  email: string,
  password: string,
}

function useRegister(user: Ref<RegisterData>): () => void {
  function register(): void {
    const authStore = useAuthStore();
    authStore.register(user.value);
  }

  return register;
}

const SignView = defineComponent({
  components: {
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  },
  setup() {
    const authStore = useAuthStore();

    const { result } = storeToRefs(authStore);

    const user = ref<RegisterData>({
      name: '',
      username: '',
      email: '',
      password: '',
    });

    const register = useRegister(user);

    return {
      user,
      result,
      register,
      CoverImage,
    };
  },
});

export default SignView;
</script>

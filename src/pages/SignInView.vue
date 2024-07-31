<template>
  <main class="sign-page">
    <div
      class="sign-page__cover"
      :style="{ backgroundImage: `url(${CoverImage})` }"
    >
    </div>
    <div class="sign-page__body">
      <h4 class="sign-page-body__title">
        Sign In
      </h4>
      <AlertComponent
        v-if="isSuccessfulRegistered"
        :color="'success'"
      >
        🍾 You are successfully registered. You can now Sign In with your username or email.
      </AlertComponent>
      <p
        class="sign-page-body__subtitle"
        v-else
      >
        Don’t have an account yet?
        <router-link
          class="sign-page-body__link"
          :to="{ name: 'SIGN_UP' }"
        >
          Sign Up
        </router-link>
      </p>
      <form class="auth-form">
        <InputComponent
          v-model="user.login"
          placeholder="Your username or email address"
          type="text"
        />
        <InputComponent
          placeholder="Password"
          type="password"
          v-model="user.password"
        />
        <div class="auth-form__options">
          <CheckboxComponent
            label="Remember me"
          />
          <router-link
            class="auth-form-options__link"
            :to="'/'"
          >
            Forgot password?
          </router-link>
        </div>
        <ButtonComponent
          flex
          color="dark"
          label="Submit"
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
import ButtonComponent from "@/components/ButtonComponent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import AlertComponent from "@/components/AlertComponent.vue";

export interface LoginData {
  login: string,
  password: string,
}

const SignView = defineComponent({
  components: {
    AlertComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  },
  setup() {
    const route = useRoute();

    const authStore = useAuthStore();

    const { result } = storeToRefs(authStore);

    const isSuccessfulRegistered = computed(() => route.query['successful-registered'] !== undefined);
    const login = computed(() => result.value?.email ?? result.value?.username ?? '');

    const user = ref<LoginData>({
      login: login.value,
      password: '',
    });

    return {
      CoverImage,
      user,
      isSuccessfulRegistered,
    };
  },
});

export default SignView;
</script>

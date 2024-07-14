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
      <p class="sign-page-body__subtitle">
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
          placeholder="Your username or email address"
          type="text"
        />
        <InputComponent
          placeholder="Password"
          type="password"
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
import { defineComponent } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';
import CoverImage from '@/assets/cover.png';
import ButtonComponent from "@/components/ButtonComponent.vue";

const SignView = defineComponent({
  components: {
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  },
  setup() {
    return {
      CoverImage,
    };
  },
});

export default SignView;
</script>

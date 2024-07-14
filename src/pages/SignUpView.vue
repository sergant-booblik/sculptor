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
      <form class="auth-form">
        <InputComponent
          placeholder="Your name"
          type="text"
        />
        <InputComponent
          placeholder="Username"
          type="text"
        />
        <InputComponent
          placeholder="Email address"
          type="text"
        />
        <InputComponent
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

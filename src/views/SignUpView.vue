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
        <ClearInputComponent
          v-model="user.name"
          placeholder="Your name"
          type="text"
        />
        <ClearInputComponent
          v-model="user.username"
          :errors="error?.username"
          placeholder="Username"
          type="text"
          @change="clearError('username')"
        />
        <ClearInputComponent
          v-model="user.email"
          :errors="error?.email"
          placeholder="Email address"
          type="email"
          @change="clearError('email')"
        />
        <ClearInputComponent
          placeholder="Password"
          :type="passwordFieldType"
          :append-icon="'eye-icon'"
          v-model="user.password"
          @click-input-button="changePasswordVisibility"
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
import ClearInputComponent, { InputType } from '@/components/ClearInputComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';
import CoverImage from '@/assets/images/sign-cover-2.jpg';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import router, { RouteName } from "@/router";
import type { ErrorData, RegisterData } from "@/type/auth";

const SignView = defineComponent({
  components: {
    ButtonComponent,
    ClearInputComponent,
    CheckboxComponent,
  },
  beforeRouteEnter() {
    const authStore = useAuthStore();
    if (authStore.isAuth) {
      router.push({ name: RouteName.DASHBOARD });
    }
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
      return user.value.username !== ''
        && user.value.password !== ''
        && isAgreeWithPolicies.value;
    });

    const passwordFieldType = ref(InputType.PASSWORD);

    const changePasswordVisibility = () => {
      if (passwordFieldType.value === InputType.PASSWORD) {
        passwordFieldType.value = InputType.TEXT;
      } else {
        passwordFieldType.value = InputType.PASSWORD;
      }
    };

    return {
      CoverImage,
      user,
      result,
      error,
      passwordFieldType,
      isAgreeWithPolicies,
      isFormCanBeSubmitted,
      register,
      clearError,
      changePasswordVisibility,
    };
  },
});

export default SignView;
</script>

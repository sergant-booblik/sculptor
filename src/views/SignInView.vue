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
        🍾 You are successfully registered. You can now Sign In with your username.
      </AlertComponent>
      <AlertComponent
        v-if="error"
        :color="'danger'"
      >
        <ul class="auth-form__error">
          <li
            v-for="(errorText, index) in error"
            :key="index"
          >
            ⛔ {{ errorText }}
          </li>

        </ul>
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
      <form
        class="auth-form"
        @submit.prevent="login"
      >
        <ClearInputComponent
          v-model="user.username"
          placeholder="Your username or email address"
          type="text"
          @change="clearError('username')"
        />
        <ClearInputComponent
          placeholder="Password"
          :type="passwordFieldType"
          :append-icon="'eye-icon'"
          v-model="user.password"
          @click-input-button="changePasswordVisibility"
          @change="clearError('password')"
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
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import ClearInputComponent, { InputType } from '@/components/ClearInputComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import CoverImage from '@/assets/images/sign-cover.png';
import router, { RouteName } from "@/router";
import { useAuthStore } from "@/stores/auth";
import type { ErrorData, LoginData } from "@/type/auth";

const SignView = defineComponent({
  components: {
    AlertComponent,
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
    const route = useRoute();

    const authStore = useAuthStore();

    const { result, isAuth, error } = storeToRefs(authStore);

    const isSuccessfulRegistered = computed(() => route.query['successful-registered'] !== undefined);
    const username = computed(() => result.value?.username ?? '');

    const user = ref<LoginData>({
      username: username.value,
      password: '',
    });

    const passwordFieldType = ref(InputType.PASSWORD);

    const changePasswordVisibility = () => {
      if (passwordFieldType.value === InputType.PASSWORD) {
        passwordFieldType.value = InputType.TEXT;
      } else {
        passwordFieldType.value = InputType.PASSWORD;
      }
    };

    const clearError = (field: keyof ErrorData) => {
      authStore.clearError(field);
    };

    function login(): void {
      authStore.login(user.value).then(() => {
        if (isAuth.value) {
          router.push({ name: RouteName.DASHBOARD });
        }
      });
    }

    return {
      CoverImage,
      user,
      isSuccessfulRegistered,
      passwordFieldType,
      error,
      login,
      clearError,
      changePasswordVisibility,
    };
  },
});

export default SignView;
</script>

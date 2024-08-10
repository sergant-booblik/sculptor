<template>
  <div class="modal__header">
    <h5>Создаем новую игру</h5>
  </div>
  <div class="modal__body">
    <form @submit.prevent="addQuiz">
      <InputComponent
        label="Название игры"
        v-model="quizName"
        :errors="errors?.name"
        @change="clearError('name')"
      />
      <TextareaComponent
        label="Описание"
        v-model="quizDescription"
      />
      <SelectComponent
        flex
        v-model="currentChoiceId"
        :choices="categoryChoices"
        placeholder="Выберите категорию"
        label="Категория"
      />
      <div class="button-group">
        <ButtonComponent
          flex
          label="Начать"
          @click.prevent="addQuiz"
        />
        <ButtonComponent
          flex
          label="Отмена"
          :color="ButtonColor.SECONDARY"
          @click="closeModal"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import TextareaComponent from '@/components/TextareaComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import { useCategoryStore } from "@/stores/category";
import { useQuizStore } from "@/stores/quiz";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import ButtonComponent, { ButtonColor } from "@/components/ButtonComponent.vue";
import { useModalStore } from "@/stores/modal";
import type { ErrorData } from "@/type/quiz";
import { useRouter } from "vue-router";
import { RouteName } from "@/router";

const router = useRouter();

const categoryStore = useCategoryStore();
const quizStore = useQuizStore();
const modalStore = useModalStore();

const { categories } = storeToRefs(categoryStore);
const { errors } = storeToRefs(quizStore);

const categoryChoices = computed(() => {
  return categories.value?.map((category) => ({
    key: category.id,
    value: category.name,
    enabled: true,
  }));
});

const currentChoiceId = ref(undefined);

const quizName = ref('');
const quizDescription = ref('');

function closeModal() {
  quizName.value = '';
  quizDescription.value = '';
  modalStore.closeModal();
}

function clearError (field: keyof ErrorData): void {
  quizStore.clearError(field);
}

function addQuiz() {
  quizStore.addQuiz({
    name: quizName.value,
    description: quizDescription.value,
    category: currentChoiceId.value,
    user_id: 1,
  }).then((resp: any) => {
    if (resp.id) {
      modalStore.closeModal();
      router.push({ name: RouteName.EDIT_QUIZ, params: { id: resp.id } })
    }
  })
}
</script>

<style scoped lang="scss">
h5 {
  @apply mb-2;
}

.button-group {
  @apply mt-8;
  @apply flex gap-3;
}
</style>

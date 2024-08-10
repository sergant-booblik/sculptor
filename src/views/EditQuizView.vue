<template>
  <div class="page page--edit-quiz">
    <div class="question__editor"></div>
    <div class="quiz__editor">
      <h2>{{ currentQuiz?.name }}</h2>
    </div>
    <div class="question__preview"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';
import { useCategoryStore } from "@/stores/category";

onMounted(() => {
  const quizStore = useQuizStore();
  const categoryStore = useCategoryStore();
  if (categoryStore.categories === undefined) {
    categoryStore.fetchCategories();
  }
  if (quizStore.quiz === undefined) {
    quizStore.fetchQuiz();
  }
});

const route = useRoute();

const quizStore = useQuizStore()

const quizId = computed(() => route.params.id);

const currentQuiz = computed(() => quizStore.getCertainQuiz(quizId.value))
</script>

<style scoped lang="scss">
.page--edit-quiz {
  @apply grid grid-cols-3 grid-rows-4;
}

.question__editor {
  @apply col-span-2 row-span-3;
}

.quiz__editor {
  @apply row-span-3 col-start-3;
}

.question__preview {
  @apply col-span-3 row-start-4;
}
</style>

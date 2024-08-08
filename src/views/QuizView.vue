<template>
 <div class="page page--quiz">
   <div class="page-header">
     <h1 class="page-title">
       Quiz games
     </h1>
     <p class="page-subtitle">
       Let’s play the quiz you always imagined
     </p>
   </div>
  <div class="page-body">
    <div class="quiz-settings">
      <div class="quiz-filter">
        <div class="filter-item">
          <SelectComponent
            v-model="currentChoiceId"
            :choices="categoryChoices"
          />
        </div>
      </div>
      <div class="quiz-view">
        <div
          v-for="view in views"
          :key="view.id"
          :class="[
            'quiz-view__button',
            { 'quiz-view__button--active': view.id === selectedView }
          ]"
          role="button"
          @click="setView(view.id)"
        >
          <component :is="`${view.name}-view-icon`" />
        </div>
      </div>
    </div>
    <div
      :class="['quiz-body', viewClass]"
    >
      <div
        v-for="item in quiz"
        :key="item.id"
        role="button"
        class="quiz-card"
      >
        <div
          :class="[
            'item__image',
            !item.image ? `item__image--empty-${item.id % 10}` : undefined,
          ]"
          :style="item.image !== null ? { backgroundImage: `url(${item.image})` } : undefined"
        />
        <div class="item__body">
          <div class="item__header">
            <h4 class="item__title">{{ item.name }}</h4>
            <div class="item__description">
              {{ item.description }}
            </div>
          </div>
          <div class="item__footer">
            <div class="item__chips">
              <div class="item__chip">
                <div class="chip__icon">
                  ⭐
                </div>
                <div class="chip__text">
                  {{ item.question.length ?? 0 }} вопросов
                </div>
              </div>
              <div class="item__chip">
                <div class="chip__icon">
                  ⏱️
                </div>
                <div class="chip__text">
                  {{ '2' }} минуты
                </div>
              </div>
              <div
                v-if="item.is_draft"
                class="item__chip"
              >
                <div class="chip__icon">
                  🔒️
                </div>
                <div class="chip__text">
                  {{ 'Черновик' }}
                </div>
              </div>
            </div>
            <div class="item__controls">
              <ButtonComponent
                prepend-icon="play-icon"
                :color="'dark'"
              />
              <ButtonComponent
                prepend-icon="pencil-icon"
                :color="'dark'"
              />
              <ButtonComponent
                prepend-icon="trash-icon"
                :color="'danger'"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="quiz-card">
        <div class="item__image"></div>
        <div class="item__body">
          <h4> + </h4>
          <div class="item__details">
            Add new quiz
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuizStore } from '@/stores/quiz';
import { useCategoryStore } from '@/stores/category';
import SelectComponent, { type SelectChoice } from '@/components/SelectComponent.vue';
import ButtonComponent from "@/components/ButtonComponent.vue";

const QuizView = defineComponent({
  components: {
    ButtonComponent,
    SelectComponent,
    GridViewIcon: defineAsyncComponent(() => import('@/assets/grid-view.svg')),
    SideViewIcon: defineAsyncComponent(() => import('@/assets/side-view.svg')),
  },
  beforeRouteEnter() {
    const quizStore = useQuizStore();
    const categoryStore = useCategoryStore();
    if (categoryStore.categories === undefined) {
      categoryStore.fetchCategories();
    }
    if (quizStore.quiz === undefined) {
      quizStore.fetchQuiz();
    }
  },
  setup() {
    const quizStore = useQuizStore();
    const categoryStore = useCategoryStore();

    const { quiz } = storeToRefs(quizStore);
    const { categories } = storeToRefs(categoryStore);

    const categoryChoices = computed(() => {
      const initChoices: SelectChoice[] = [{key: undefined, value: 'All categories', enabled: true}];
      categories.value?.map((category) => {
        initChoices.push({
          key: category.id,
          value: category.name,
          enabled: true,
        });
      });
      return initChoices;
    });
    const currentChoiceId = ref(undefined);

    const views = computed(() => [
      { id: 0, name: 'grid' },
      { id: 1, name: 'side' },
    ]);
    const selectedView = ref(0);

    const setView = (id: number) => {
      selectedView.value = id;
    };

    const viewClass = computed(() => {
      const view = views.value.find((view) => view.id === selectedView.value);
      return `quiz-body--${view?.name}`
    });

    watch(currentChoiceId, (newChoiceId) => {
      quizStore.fetchQuiz(newChoiceId);
    });

    return {
      categories,
      quiz,
      categoryChoices,
      currentChoiceId,
      views,
      selectedView,
      viewClass,
      setView,
    }
  },
});

export default QuizView;
</script>

<template>
 <div class="page page--quiz">
   <div class="page-header">
     <div class="page-header__wrapper">
       <h1 class="page-title">
         Ваши игры
       </h1>
       <ButtonComponent
         prepend-icon="plus-icon"
         :color="'secondary'"
         label="Создать игру"
       />
     </div>
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
                  Вопросов: {{ item.question.length ?? 'нет' }}
                </div>
              </div>
              <div class="item__chip">
                <div class="chip__icon">
                  ⏱️
                </div>
                <div class="chip__text">
                  Время: {{ '2' }} мин.
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
                @click="navigateToEdit(item.id)"
              />
              <ButtonComponent
                prepend-icon="trash-icon"
                :color="'danger'"
              />
            </div>
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
import { useRouter } from "vue-router";
import { RouteName } from "@/router";
import Icon from "@/components/icon";
import { useBaseStore } from "@/stores/base";

const QuizView = defineComponent({
  components: {
    ButtonComponent,
    SelectComponent,
    GridViewIcon: defineAsyncComponent(() => import('@/assets/grid-view.svg')),
    SideViewIcon: defineAsyncComponent(() => import('@/assets/side-view.svg')),
    PlusIcon: Icon.PlusIcon,
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
    const router = useRouter();

    const quizStore = useQuizStore();
    const categoryStore = useCategoryStore();
    const baseStore = useBaseStore();

    const { quiz } = storeToRefs(quizStore);
    const { categories } = storeToRefs(categoryStore);
    const { views } = storeToRefs(baseStore);

    const categoryChoices = computed(() => {
      const initChoices: SelectChoice[] = [{key: undefined, value: 'Все категории', enabled: true}];
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

    const selectedView = ref(0);

    const setView = (id: number) => {
      selectedView.value = id;
    };

    const viewClass = computed(() => {
      const view = views.value.find((view) => view.id === selectedView.value);
      return `quiz-body--${view?.name}`
    });

    const navigateToEdit = (id: number) => {
      router.push({ name: RouteName.EDIT_QUIZ, params: { id } });
    }

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
      navigateToEdit,
    }
  },
});

export default QuizView;
</script>

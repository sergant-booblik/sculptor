<template>
  <div class="body">
    <div
      v-if="result"
      class="container pt-6"
    >
      <h1>🍾 Question successfully added!</h1>
      <button
        class="button shake-button"
        @click="reset"
      >
        Add another question now!
      </button>
    </div>
    <div
      v-else
      class="container pt-6"
    >
      <h1 class="mb-6">Question Form</h1>
      <p
        v-if="error"
        class="error"
      >
        ⛔ The following errors was catch during saving:
        <br>
        {{ error }}
      </p>
      <form class="max-w-2xl">
        <div class="textarea-group">
          <label>Type your question here</label>
          <textarea
            v-model="question.question"
            class="textarea"
          />
        </div>
        <div class="textarea-group">
          <textarea
            v-model="question.description"
            placeholder="Description"
            class="textarea textarea--small"
          />
        </div>
        <div class="answer-group">
          <div
            v-for="(answer, index) in question.answers"
            :key="index"
            class="answer-item"
          >
            <label>{{ `Answer #${index + 1}` }}</label>
            <input
              v-model="answer.text"
              class="input"
            />
            <input
              class="radio"
              type="radio"
              name="answer"
              :checked="answer.isRight"
            />
          </div>
          <button
            class="link"
            type="button"
            @click="addAnswerField"
          >
            Add answer field
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"></path>
            </svg>
          </button>
        </div>
        <button
          class="button"
          type="submit"
          :disabled="loading"
          @click.prevent="saveQuestion"
        >
          Save question
          <span
            v-if="loading"
            class="loader"
          />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Question {
  question: string,
  description: string,
  user_id: number,
  is_private: boolean,
  answers: Answer[],
}

interface Answer {
  text: string,
  isRight: boolean,
}

const AddQuestionView = defineComponent({
  setup() {

    const token = '';

    const loading = ref(false);

    const result = ref('');
    const error = ref('');

    const initQuestionState = ref<Question>({
      question: '',
      description: '',
      user_id: 1,
      is_private: true,
      answers: [
        { text: '', isRight: true },
        { text: '', isRight: false },
      ]
    });

    const question = ref({
      question: '',
      description: '',
      user_id: 1,
      is_private: true,
      answers: [
        { text: '', isRight: true },
        { text: '', isRight: false },
      ]
    });

    console.log(import.meta.env.VITE_API_URL);

    const saveQuestion = () => {
      return new Promise(() => {
        loading.value = true;
        fetch(`${import.meta.env.VITE_API_URL}/user-game/`, {
          method: 'POST',
          body: JSON.stringify(question.value),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }).then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.statusText);
          }
          return resp.json();
        }).then((resp) => result.value = resp)
          .catch((err) => error.value = err)
          .finally(() => {
          loading.value = false;
        });
      })
    };

    const reset = () => {
      result.value = '';
      error.value = '';
      question.value = initQuestionState.value;
    }

    const addAnswerField = () => {
      question.value?.answers.push({ text: '', isRight: false },)
    }

    return {
      loading,
      question,
      result,
      error,
      addAnswerField,
      saveQuestion,
      reset,
    }
  },
});

export default AddQuestionView;
</script>

<style scoped lang="scss">
@import "@/scss/component/add-quest";

.body {
  height: 100vh;
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  color: white;
}

.loader {
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border: 2px solid;
  border-color: #F3F5F7 transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.error {
  animation: shake 200ms ease-in-out 0s 5;
}

.shake-button {
  animation: shake 200ms ease-in-out infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 5px;
  }
  75% {
    margin-left: -5px;
  }
  100% {
    margin-left: 0;
  }
}
</style>

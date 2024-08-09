<template>
  Edit Quiz #{{ quizId }}
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const quizId = route.params.id;
</script>

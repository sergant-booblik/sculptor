<template>
  <template v-if="layout === 'MAIN' ">
    <HeaderSection />
  </template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HeaderSection from "@/components/HeaderSection.vue";
import { useRoute } from "vue-router";

const App = defineComponent({
  components: {
    HeaderSection,
  },
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout);

    return {
      layout,
    };
  },
});

export default App;
</script>

<style lang="scss" src="@/scss/main.scss" />

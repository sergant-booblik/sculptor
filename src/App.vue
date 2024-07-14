<template>
  <template v-if="layout === 'MAIN' ">
    <NotifySection />
    <HeaderSection />
  </template>
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import NotifySection from '@/components/NotifySection.vue';
import HeaderSection from '@/components/HeaderSection.vue';

const App = defineComponent({
  components: {
    NotifySection,
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

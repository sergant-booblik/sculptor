<template>
  <HeaderSection v-if="layout === 'MAIN' " />
  <router-view />
  <ModalComponent />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { useRoute } from 'vue-router';
import ModalComponent from '@/components/ModalComponent.vue';

const App = defineComponent({
  components: {
    ModalComponent,
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

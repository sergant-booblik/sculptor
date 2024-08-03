<template>
  <template v-if="layout === 'MAIN' ">
    <NotifySection />
    <HeaderSection />
  </template>
  <router-view />
  <FooterSection v-if="layout === 'MAIN'" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import NotifySection from '@/components/NotifySection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from "@/components/FooterSection.vue";

const App = defineComponent({
  components: {
    FooterSection,
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

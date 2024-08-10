import { defineAsyncComponent } from "vue";

const ModalComponent = {
  AddGameModal: defineAsyncComponent(() => import('./AddGameModal.vue')),
}

export default ModalComponent;

<template>
  <div
    class="modal"
    v-if="name"
  >
    <div
      ref="modalRef"
      class="modal__wrapper"
    >
      <span
        role="button"
        class="close-icon"
        @click="closeModal()"
      >
        <CloseIcon />
      </span>
      <component
        :is="modalComponent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { onClickOutside } from '@vueuse/core';
import { Modal, useModalStore } from '@/stores/modal';
import CloseIcon from '@/components/icon/close.svg';
import ModalComponent from './modal';

const modalStore = useModalStore();

const modalRef = ref<HTMLElement>();

const { name } = storeToRefs(modalStore);

const modalComponent = computed(() => {
  switch (name.value) {
    case Modal.ADD_GAME:
      return ModalComponent.AddGameModal;
    default:
      return undefined;
  }
});

onClickOutside(modalRef, () => modalStore.closeModal());

function closeModal(): void {
  modalStore.closeModal();
}
</script>

<style scoped lang="scss">
.modal__wrapper {
  @apply bg-slate-50;
}
</style>

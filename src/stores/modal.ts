import { defineStore } from 'pinia';

export enum Modal {
  ADD_GAME = 'add-game',
}

interface ModalState {
  name: Modal | undefined,
  id?: string | number,
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    name: undefined,
    id: undefined,
  }),
  actions: {
    setModal(name: Modal | undefined, id?: string | number ) {
      this.name = name;
      this.id = id ?? undefined;
    },
    closeModal() {
      this.name = undefined;
      this.id = undefined;
    }
  },
});

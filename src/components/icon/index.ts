import { defineAsyncComponent } from 'vue';

const Icon = {
  AccountIcon: defineAsyncComponent(() => import('@/components/icon/account.svg')),
  ArrowRightIcon: defineAsyncComponent(() => import('@/components/icon/arrow-right.svg')),
  ArrowDownSmallIcon: defineAsyncComponent(() => import('@/components/icon/arrow-down-small.svg')),
  CloseIcon: defineAsyncComponent(() => import('@/components/icon/close.svg')),
  EyeIcon: defineAsyncComponent(() => import('@/components/icon/eye.svg')),
  PencilIcon: defineAsyncComponent(() => import('@/components/icon/pencil.svg')),
  PlayIcon: defineAsyncComponent(() => import('@/components/icon/play.svg')),
  PlusIcon: defineAsyncComponent(() => import('@/components/icon/plus.svg')),
  TrashIcon: defineAsyncComponent(() => import('@/components/icon/trash.svg')),
}

export default Icon;

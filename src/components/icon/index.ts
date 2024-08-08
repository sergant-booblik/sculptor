import { defineAsyncComponent } from 'vue';

const Icon = {
  AccountIcon: defineAsyncComponent(() => import('@/components/icon/account.svg')),
  ArrowRightIcon: defineAsyncComponent(() => import('@/components/icon/arrow-right.svg')),
  ArrowDownSmallIcon: defineAsyncComponent(() => import('@/components/icon/arrow-down-small.svg')),
  EyeIcon: defineAsyncComponent(() => import('@/components/icon/eye.svg')),
  PencilIcon: defineAsyncComponent(() => import('@/components/icon/pencil.svg')),
  PlayIcon: defineAsyncComponent(() => import('@/components/icon/play.svg')),
  TrashIcon: defineAsyncComponent(() => import('@/components/icon/trash.svg')),
}

export default Icon;

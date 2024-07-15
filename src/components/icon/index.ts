import { defineAsyncComponent } from 'vue';

const Icon = {
  AccountIcon: defineAsyncComponent(() => import('@/components/icon/account.svg')),
  ArrowRightIcon: defineAsyncComponent(() => import('@/components/icon/arrow-right.svg')),
  CallIcon: defineAsyncComponent(() => import('@/components/icon/call.svg')),
  CartIcon: defineAsyncComponent(() => import('@/components/icon/cart.svg')),
  CloseIcon: defineAsyncComponent(() => import('@/components/icon/close.svg')),
  DeliveryIcon: defineAsyncComponent(() => import('@/components/icon/delivery.svg')),
  EyeIcon: defineAsyncComponent(() => import('@/components/icon/eye.svg')),
  LockIcon: defineAsyncComponent(() => import('@/components/icon/lock.svg')),
  MoneyIcon: defineAsyncComponent(() => import('@/components/icon/money.svg')),
  SearchIcon: defineAsyncComponent(() => import('@/components/icon/search.svg')),
  SliderControlNextIcon: defineAsyncComponent(() => import('@/components/icon/slider-control-next.svg')),
  SliderControlPrevIcon: defineAsyncComponent(() => import('@/components/icon/slider-control-prev.svg')),
  StarControlPrevIcon: defineAsyncComponent(() => import('@/components/icon/star.svg')),
  StarEmptyControlPrevIcon: defineAsyncComponent(() => import('@/components/icon/star-empty.svg')),
  TicketPercentIcon: defineAsyncComponent(() => import('@/components/icon/ticket-percent.svg')),
}

export default Icon;

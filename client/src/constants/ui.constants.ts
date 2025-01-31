export const BASE_BUTTON_STATUS = {
  FILL: 'fill',
  OUTLINE: 'outline',
  DISABLE: 'disable',
} as const;

export type BaseButtonStatus =
  (typeof BASE_BUTTON_STATUS)[keyof typeof BASE_BUTTON_STATUS];

export const ICON_NAME = {
  MYPAGE: 'mypage',
  DOODLEBACK: 'doodleback',
  HOME: 'home',
  HEART: 'heart',
  SEND: 'send',
  BACK: 'back',
  BIGGER: 'bigger',
  ORANGEBIGGER: 'orangebigger',
  DOTS: 'dots',
  LEFT: 'left',
} as const;

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME];

// 상수 정의
const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  TEL: 'tel',
  EMAIL: 'email',
  PASSWORD: 'password',
  SEARCH: 'search',
} as const;

const INPUT_VARIANTS = {
  DEFAULT: 'default',
  SEARCH: 'search',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type InputTypes = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
export type InputVariants =
  (typeof INPUT_VARIANTS)[keyof typeof INPUT_VARIANTS];

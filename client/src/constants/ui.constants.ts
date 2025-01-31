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
  LEFT: 'left'
} as const;
  
export type IconName = 
  (typeof ICON_NAME)[keyof typeof ICON_NAME];
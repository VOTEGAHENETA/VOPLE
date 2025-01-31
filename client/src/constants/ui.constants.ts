export const BASE_BUTTON_STATUS = {
  FILL: 'fill',
  OUTLINE: 'outline',
  DISABLE: 'disable',
} as const;

export type BaseButtonStatus =
  (typeof BASE_BUTTON_STATUS)[keyof typeof BASE_BUTTON_STATUS];

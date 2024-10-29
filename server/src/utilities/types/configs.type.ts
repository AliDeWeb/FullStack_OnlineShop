export type config =
  | 'transportMethod'
  | 'transportCost'
  | 'transportMinimumFreeCost'
  | 'activeSales'
  | 'cardInfo';

export const configsEnum: config[] = [
  'transportMethod',
  'transportCost',
  'transportMinimumFreeCost',
  'activeSales',
  'cardInfo',
];

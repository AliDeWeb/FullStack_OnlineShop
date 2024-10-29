export type orderStatusType =
  | 'payment'
  | 'paySlipsReview'
  | 'review'
  | 'sending'
  | 'sent'
  | 'failed'
  | 'pending';

export const orderStatusEnum: orderStatusType[] = [
  'payment',
  'paySlipsReview',
  'review',
  'sending',
  'sent',
  'failed',
  'pending',
];

export const mailSubject = {
  'forgot-password': 'Redefinição de senha',
  'reset-password': 'Sua senha foi redefinida',
  'user.welcome': 'Bem-vindo à nossa plataforma',
  'order.created': 'Pedido recebido com sucesso',
  'order.paid': 'Pagamento confirmado',
  'order.shipped': 'Seu pedido foi enviado',
  'order.canceled': 'Seu pedido foi cancelado',
} as const

export type MailTemplate = keyof typeof mailSubject

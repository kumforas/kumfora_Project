const WHATSAPP_PHONE = '917080163349';

const STATE_NAMES: Record<string, string> = {
  MH: 'Maharashtra',
  DL: 'Delhi',
  KA: 'Karnataka',
  TN: 'Tamil Nadu',
  GJ: 'Gujarat',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
  RJ: 'Rajasthan',
  OTHER: 'Other',
};

interface WhatsAppOrderData {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  items: { product: { name: string; price: number }; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function generateWhatsAppUrl(data: WhatsAppOrderData): string {
  const stateName = STATE_NAMES[data.state] || data.state;
  const paymentLabel = data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment';

  const itemsList = data.items
    .map((item, i) => `${i + 1}. ${item.product.name} × ${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`)
    .join('\n');

  const message = [
    `*New Order — ${data.orderId}*`,
    '',
    `*Customer*`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    '',
    `*Shipping Address*`,
    `${data.address}`,
    `${data.city}, ${stateName} ${data.pincode}`,
    `India`,
    '',
    `*Items*`,
    itemsList,
    '',
    `*Pricing*`,
    `Subtotal: ₹${data.subtotal.toLocaleString('en-IN')}`,
    `Shipping: ${data.shipping === 0 ? 'Free' : '₹' + data.shipping.toLocaleString('en-IN')}`,
    `*Total: ₹${data.total.toLocaleString('en-IN')}*`,
    '',
    `*Payment: ${paymentLabel}*`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

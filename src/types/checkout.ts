export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  company?: string;
  notes?: string;
}

export interface OrderData {
  customerInfo: CheckoutForm;
  items: Array<{
    id: string;
    productId: string;
    color: string;
    sizeQuantities: Array<{ size: string; quantity: number }>;
    logos?: Array<{
      id: string;
      position: string;
      name?: string;
      applications: Array<{ size: string; quantity: number }>;
    }>;
  }>;
  total: number;
}
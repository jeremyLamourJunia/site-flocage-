export interface CartItem {
  id: string;
  productId: string;
  color: string;
  sizeQuantities: {
    size: string;
    quantity: number;
  }[];
  logos?: {
    id: string;
    position: string;
    name?: string;
    file?: File;
    fileUrl: string;
    applications: {
      size: string;
      quantity: number;
    }[];
  }[];
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
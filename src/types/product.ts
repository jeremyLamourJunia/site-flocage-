export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tshirt' | 'sweatshirt' | 'polo';
  colors: string[];
  sizes: string[];
  discounts: {
    minQuantity: number;
    percentage: number;
  }[];
  minOrder: number;
}
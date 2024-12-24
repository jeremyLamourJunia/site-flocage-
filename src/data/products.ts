import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'T-Shirt Premium',
    description: 'T-shirt 100% coton bio, idéal pour le flocage',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'tshirt',
    colors: ['white', 'black', 'navy', 'red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    minOrder: 6,
    discounts: [
      { minQuantity: 10, percentage: 10 },
      { minQuantity: 25, percentage: 20 },
      { minQuantity: 50, percentage: 30 },
      { minQuantity: 100, percentage: 40 }
    ]
  },
  {
    id: '2',
    name: 'Sweat-shirt Classic',
    description: 'Sweat-shirt confortable parfait pour les associations',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'sweatshirt',
    colors: ['gray', 'black', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    minOrder: 6,
    discounts: [
      { minQuantity: 15, percentage: 10 },
      { minQuantity: 30, percentage: 20 },
      { minQuantity: 60, percentage: 30 },
      { minQuantity: 120, percentage: 40 }
    ]
  },
  {
    id: '3',
    name: 'Polo Sport',
    description: 'Polo technique pour équipes sportives',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'polo',
    colors: ['white', 'blue', 'red'],
    sizes: ['S', 'M', 'L', 'XL'],
    minOrder: 6,
    discounts: [
      { minQuantity: 12, percentage: 10 },
      { minQuantity: 20, percentage: 20 },
      { minQuantity: 40, percentage: 30 },
      { minQuantity: 80, percentage: 40 }
    ]
  },
];
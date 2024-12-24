import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem } from '../types/cart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: CartItem }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const CART_STORAGE_KEY = 'textile_pro_cart';

function cartReducer(state: Cart, action: CartAction): Cart {
  let newState: Cart;
  
  switch (action.type) {
    case 'ADD_ITEM':
      newState = {
        items: [...state.items, action.payload],
        total: state.total + action.payload.totalPrice,
      };
      break;
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      newState = {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove?.totalPrice || 0),
      };
      break;
    case 'UPDATE_ITEM':
      const oldItem = state.items.find(item => item.id === action.payload.id);
      newState = {
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        total: state.total - (oldItem?.totalPrice || 0) + action.payload.totalPrice,
      };
      break;
    case 'CLEAR_CART':
      newState = { items: [], total: 0 };
      break;
    case 'LOAD_CART':
      newState = action.payload;
      break;
    default:
      return state;
  }

  // Persist to localStorage after each change
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateCart = (item: CartItem) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
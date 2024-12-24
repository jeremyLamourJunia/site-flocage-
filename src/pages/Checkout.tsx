import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { CheckoutForm as CheckoutFormType } from '../types/checkout';
import { prepareOrderData, prepareFormData } from '../utils/orderUtils';
import { orderApi } from '../utils/api';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutFormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    company: undefined,
    notes: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = prepareOrderData(form, cart);
      const formData = prepareFormData(orderData, cart);

      await orderApi.submitOrder(formData);

      alert('Votre commande a été envoyée avec succès ! Nous vous contacterons rapidement.');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la commande:', error);
      alert('Une erreur est survenue lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value.trim() === '' && (name === 'company' || name === 'notes') ? undefined : value
    }));
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Finaliser la commande</h1>
        <CheckoutForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          total={cart.total}
        />
      </div>
    </div>
  );
}
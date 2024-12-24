import { CheckoutForm } from '../types/checkout';
import { Cart } from '../types/cart';

export const prepareOrderData = (form: CheckoutForm, cart: Cart) => {
  return {
    customerInfo: form,
    items: cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      color: item.color,
      sizeQuantities: item.sizeQuantities,
      logos: item.logos?.map(logo => ({
        id: logo.id,
        position: logo.position,
        name: logo.name,
        applications: logo.applications
      })),
      totalPrice: item.totalPrice
    })),
    total: cart.total,
  };
};

export const prepareFormData = (orderData: any, cart: Cart) => {
  const formData = new FormData();
  formData.append('orderData', JSON.stringify(orderData));

  // Ajout des fichiers de logos
  cart.items.forEach((item, itemIndex) => {
    item.logos?.forEach((logo, logoIndex) => {
      if (logo.file) {
        const fileName = `logo_${itemIndex}_${logoIndex}`;
        formData.append(fileName, logo.file);
      }
    });
  });

  return formData;
};
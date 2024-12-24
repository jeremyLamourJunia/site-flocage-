import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { LOGO_POSITIONS, type CustomizationState } from '../types/customization';
import { useCart } from '../context/CartContext';
import ColorPicker from '../components/ColorPicker';
import SizeQuantitySelector from '../components/SizeQuantitySelector';
import LogoSelector from '../components/LogoSelector';

export default function Customize() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [customization, setCustomization] = useState<CustomizationState>({
    color: product?.colors[0] || '',
    sizeQuantities: [{ size: product?.sizes[0] || '', quantity: 1 }],
    logos: [],
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Produit non trouvé</p>
      </div>
    );
  }

  const getTotalQuantity = () => {
    return customization.sizeQuantities.reduce((sum, sq) => sum + sq.quantity, 0);
  };

  const getDiscountPercentage = (quantity: number) => {
    const discount = product.discounts
      .slice()
      .reverse()
      .find(d => quantity >= d.minQuantity);
    return discount?.percentage || 0;
  };

  const calculatePrices = () => {
    const totalQuantity = getTotalQuantity();
    const discountPercentage = getDiscountPercentage(totalQuantity);
    const basePrice = product.price * (1 - discountPercentage / 100);
    const totalBasePrice = basePrice * totalQuantity;
    
    const logosPrices = customization.logos.reduce((sum, logo) => {
      if (!logo.file) return sum;
      
      const positionPrice = LOGO_POSITIONS.find(pos => pos.id === logo.position)?.price || 0;
      const appliedQuantity = logo.applications.reduce((sum, app) => sum + app.quantity, 0);
      
      return sum + (positionPrice * appliedQuantity);
    }, 0);

    return {
      textiles: totalBasePrice,
      logos: logosPrices,
      total: totalBasePrice + logosPrices
    };
  };

  const handleAddToCart = () => {
    const totalQuantity = getTotalQuantity();
    if (totalQuantity < product.minOrder) {
      alert(`La commande minimum est de ${product.minOrder} articles au total pour ce produit.`);
      return;
    }

    // Créer un seul groupe avec tous les logos
    const validLogos = customization.logos
      .filter(logo => logo.file && logo.applications.length > 0)
      .map(logo => ({
        id: logo.id,
        position: logo.position,
        fileUrl: URL.createObjectURL(logo.file!),
        name: logo.name,
        applications: logo.applications,
      }));

    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      color: customization.color,
      sizeQuantities: customization.sizeQuantities,
      logos: validLogos,
      totalPrice: calculatePrices().total,
    };

    addToCart(cartItem);
    navigate('/cart');
  };

  const discountPercentage = getDiscountPercentage(getTotalQuantity());
  const prices = calculatePrices();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Preview */}
        <div className="lg:max-w-lg lg:self-start">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Customization Options */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-500">{product.description}</p>

          <div className="mt-8 space-y-6">
            {/* Minimum Order and Discounts Table */}
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700 mb-2">
                Commande minimum : {product.minOrder} articles au total
              </p>
              <div className="mt-2 border border-blue-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-blue-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium text-blue-800">Quantité</th>
                      <th className="px-4 py-2 text-xs font-medium text-blue-800">Réduction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-200">
                    {product.discounts.map((discount, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-xs text-blue-700 text-center">
                          {discount.minQuantity}+ articles
                        </td>
                        <td className="px-4 py-2 text-xs text-blue-700 text-center">
                          -{discount.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Couleur</h3>
              <ColorPicker
                colors={product.colors}
                selectedColor={customization.color}
                onChange={(color) => setCustomization({ ...customization, color })}
              />
            </div>

            {/* Size and Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Tailles et quantités</h3>
              <div className="mt-2">
                <SizeQuantitySelector
                  sizes={product.sizes}
                  sizeQuantities={customization.sizeQuantities}
                  onChange={(sizeQuantities) => setCustomization({ ...customization, sizeQuantities })}
                  minQuantity={1}
                  totalMinQuantity={product.minOrder}
                />
              </div>
            </div>

            {/* Logo Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Personnalisations</h3>
              <div className="mt-2">
                <LogoSelector
                  logos={customization.logos}
                  sizeQuantities={customization.sizeQuantities}
                  onChange={(logos) => setCustomization({ ...customization, logos })}
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="space-y-2">
                {discountPercentage > 0 && (
                  <p className="text-green-600 font-medium">
                    Réduction appliquée : -{discountPercentage}% sur les textiles
                  </p>
                )}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Prix des textiles</span>
                    <span>{prices.textiles.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Prix des flocages</span>
                    <span>{prices.logos.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {prices.total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
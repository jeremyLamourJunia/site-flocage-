import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, MousePointer, Phone, Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { LOGO_POSITIONS } from '../types/customization';

const steps = [
  {
    title: 'Personnalisez en ligne',
    description: 'Sélectionnez vos textiles et personnalisez-les selon vos besoins',
    icon: MousePointer,
  },
  {
    title: 'Validation du projet',
    description: 'Notre équipe vous contacte pour valider les détails de votre commande',
    icon: Phone,
  },
  {
    title: 'Réalisation et livraison',
    description: 'Production de qualité et livraison rapide de votre commande',
    icon: Package,
  },
];

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Votre panier est vide</h2>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Voir nos produits
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Votre Panier</h1>
        
        {/* Process Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Notre processus</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          {cart.items.map((item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return null;

            return (
              <div key={item.id} className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">Couleur: {item.color}</p>
                      <div className="mt-1">
                        {item.sizeQuantities.map((sq) => (
                          <span key={sq.size} className="mr-4 text-sm text-gray-500">
                            {sq.size}: {sq.quantity}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 space-y-1">
                        {item.logos?.map((logo, index) => {
                          const position = LOGO_POSITIONS.find(pos => pos.id === logo.position);
                          return (
                            <div key={logo.id} className="text-sm text-gray-500">
                              <span className="font-medium">Logo {index + 1}</span>
                              {logo.name && <span> - {logo.name}</span>}
                              <span> ({position?.label})</span>
                              {logo.applications && (
                                <div className="ml-4">
                                  {logo.applications.map(app => (
                                    <span key={app.size} className="mr-4">
                                      {app.size}: {app.quantity}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium text-gray-900">
                      {item.totalPrice.toFixed(2)} €
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer l'article"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continuer ma commande
          </button>

          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">{cart.total.toFixed(2)} €</span>
            </div>
            
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Passer la commande <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
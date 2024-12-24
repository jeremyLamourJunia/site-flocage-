import React from 'react';
import { MousePointer, Phone, Package } from 'lucide-react';

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

export default function ProcessSteps() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Notre processus</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comment ça marche ?
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{index + 1}. {step.title}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
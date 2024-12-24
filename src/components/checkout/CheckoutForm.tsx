import React from 'react';
import { CheckoutForm as CheckoutFormType } from '../../types/checkout';

interface Props {
  form: CheckoutFormType;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  total: number;
}

export default function CheckoutForm({ form, onChange, onSubmit, isSubmitting, total }: Props) {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-8">
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          name="firstName"
          label="Prénom"
          value={form.firstName}
          onChange={onChange}
          required
        />
        <FormInput
          name="lastName"
          label="Nom"
          value={form.lastName}
          onChange={onChange}
          required
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <FormInput
          name="phone"
          label="Téléphone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          required
        />
      </div>

      {/* Company Information */}
      <FormInput
        name="company"
        label="Association / Entreprise (optionnel)"
        value={form.company ?? ''}
      
        onChange={onChange}
      />

      {/* Address Information */}
      <FormInput
        name="address"
        label="Adresse"
        value={form.address}
        onChange={onChange}
        required
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          name="city"
          label="Ville"
          value={form.city}
          onChange={onChange}
          required
        />
        <FormInput
          name="postalCode"
          label="Code postal"
          value={form.postalCode}
          onChange={onChange}
          required
        />
      </div>

      {/* Additional Notes */}
      <div className="relative">
        <textarea
          name="notes"
          rows={4}
          value={form.notes ?? ''}
          
          onChange={onChange}
          placeholder=" "
          className="block w-full px-4 py-3 text-gray-900 placeholder-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer"
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:px-4 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
          Notes supplémentaires (optionnel)
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div>
          <p className="text-lg font-medium text-gray-900">Total</p>
          <p className="text-2xl font-bold text-indigo-600">{total.toFixed(2)} €</p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Valider la commande'}
        </button>
      </div>
    </div>
  </form>
  );
}

interface FormInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function FormInput({ name, label, value, onChange, type = 'text', required = false }: FormInputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="block w-full px-4 py-3 text-gray-900 placeholder-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer"
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:px-4 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
}
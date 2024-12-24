import React from 'react';
import { Plus, X, Minus } from 'lucide-react';
import { Logo, LOGO_POSITIONS, SizeQuantity } from '../types/customization';
import LogoUpload from './LogoUpload';

interface LogoSelectorProps {
  logos: Logo[];
  sizeQuantities: SizeQuantity[];
  onChange: (logos: Logo[]) => void;
}

export default function LogoSelector({ logos, sizeQuantities, onChange }: LogoSelectorProps) {
  const addLogo = () => {
    const newLogo: Logo = {
      id: Date.now().toString(),
      position: LOGO_POSITIONS[0].id,
      file: null,
      applications: [],
    };
    onChange([...logos, newLogo]);
  };

  const removeLogo = (id: string) => {
    onChange(logos.filter(logo => logo.id !== id));
  };

  const updateLogo = (id: string, updates: Partial<Logo>) => {
    onChange(
      logos.map(logo =>
        logo.id === id ? { ...logo, ...updates } : logo
      )
    );
  };

  const updateLogoQuantity = (logoId: string, size: string, quantity: number) => {
    const logo = logos.find(l => l.id === logoId);
    if (!logo) return;

    const sizeQuantity = sizeQuantities.find(sq => sq.size === size);
    if (!sizeQuantity) return;

    const maxQuantity = sizeQuantity.quantity;
    const newQuantity = Math.min(Math.max(0, quantity), maxQuantity);

    const newApplications = logo.applications.filter(a => a.size !== size);
    if (newQuantity > 0) {
      newApplications.push({ size, quantity: newQuantity });
    }

    updateLogo(logoId, { applications: newApplications });
  };

  return (
    <div className="space-y-4">
      {logos.map((logo) => (
        <div key={logo.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-900">Logo {logos.indexOf(logo) + 1}</h4>
            <button
              onClick={() => removeLogo(logo.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Nom du logo (optionnel) */}
            <div className="relative">
              <input
                type="text"
                value={logo.name || ''}
                onChange={(e) => updateLogo(logo.id, { name: e.target.value || undefined })}
                placeholder=" "
                className="block w-full px-4 py-3 text-gray-900 placeholder-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer"
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:px-4 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Nom de la personnalisation (optionnel)
              </label>
            </div>

            {/* Position du logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {LOGO_POSITIONS.map((position) => (
                  <button
                    key={position.id}
                    className={`px-3 py-2 border rounded-md text-sm ${
                      logo.position === position.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-200 text-gray-700'
                    }`}
                    onClick={() => updateLogo(logo.id, { position: position.id })}
                  >
                    {position.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sélection des quantités par taille */}
            {sizeQuantities.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantités par taille :
                </label>
                <div className="space-y-2">
                  {sizeQuantities.map((sq) => {
                    const application = logo.applications.find(a => a.size === sq.size);
                    const quantity = application?.quantity || 0;

                    return (
                      <div key={sq.size} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Taille {sq.size} (max: {sq.quantity})
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateLogoQuantity(logo.id, sq.size, quantity - 1)}
                            className="p-1 rounded-md border border-gray-300"
                            disabled={quantity <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={sq.quantity}
                            value={quantity}
                            onChange={(e) => updateLogoQuantity(logo.id, sq.size, parseInt(e.target.value) || 0)}
                            className="w-16 text-center border border-gray-300 rounded-md p-1"
                          />
                          <button
                            onClick={() => updateLogoQuantity(logo.id, sq.size, quantity + 1)}
                            className="p-1 rounded-md border border-gray-300"
                            disabled={quantity >= sq.quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upload du logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fichier</label>
              <div className="mt-1">
                <LogoUpload
                  selectedFile={logo.file}
                  onFileSelect={(file) => updateLogo(logo.id, { file })}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addLogo}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Ajouter une personnalisation
      </button>
    </div>
  );
}
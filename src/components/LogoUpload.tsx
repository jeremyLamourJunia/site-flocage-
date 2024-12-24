import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface LogoUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function LogoUpload({ onFileSelect, selectedFile }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-600 transition-colors"
      >
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            {selectedFile ? selectedFile.name : 'Cliquez pour ajouter votre logo'}
          </span>
        </div>
      </button>
    </div>
  );
}
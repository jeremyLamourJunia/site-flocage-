export interface LogoPosition {
  id: string;
  name: string;
  label: string;
  price: number;
}

export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface LogoApplication {
  size: string;
  quantity: number;
}

export interface Logo {
  id: string;
  position: string;
  file: File | null;
  fileUrl?: string;
  name?: string;
  applications: LogoApplication[];
}

export interface CustomizationState {
  color: string;
  sizeQuantities: SizeQuantity[];
  logos: Logo[];
}

export const LOGO_POSITIONS: LogoPosition[] = [
  { id: 'front', name: 'front', label: 'Devant', price: 5 },
  { id: 'back', name: 'back', label: 'Dos', price: 8 },
  { id: 'heart', name: 'heart', label: 'Cœur', price: 4 },
];
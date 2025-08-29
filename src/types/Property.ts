export interface Property {
  id: string;
  image: string;
  title: string;
  address: string;
  rent: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  createdAt: string;
}

export type PropertyFormData = Omit<Property, 'id' | 'createdAt'>;
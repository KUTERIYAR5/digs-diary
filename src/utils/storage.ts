import { Property } from '@/types/Property';

const STORAGE_KEY = 'rental-properties';

export const loadProperties = (): Property[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
};

export const saveProperties = (properties: Property[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (error) {
    console.error('Error saving properties:', error);
  }
};

export const addProperty = (property: Omit<Property, 'id' | 'createdAt'>): Property => {
  const newProperty: Property = {
    ...property,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  const properties = loadProperties();
  properties.push(newProperty);
  saveProperties(properties);
  
  return newProperty;
};

export const updateProperty = (id: string, updates: Partial<Property>): Property | null => {
  const properties = loadProperties();
  const index = properties.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProperty = { ...properties[index], ...updates };
  properties[index] = updatedProperty;
  saveProperties(properties);
  
  return updatedProperty;
};

export const deleteProperty = (id: string): boolean => {
  const properties = loadProperties();
  const filteredProperties = properties.filter(p => p.id !== id);
  
  if (filteredProperties.length === properties.length) return false;
  
  saveProperties(filteredProperties);
  return true;
};
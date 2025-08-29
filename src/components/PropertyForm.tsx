import { useState } from 'react';
import { Property, PropertyFormData } from '@/types/Property';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const PropertyForm = ({ property, onSubmit, onCancel, isEdit = false }: PropertyFormProps) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    image: property?.image || '',
    title: property?.title || '',
    address: property?.address || '',
    rent: property?.rent || 0,
    bedrooms: property?.bedrooms || undefined,
    bathrooms: property?.bathrooms || undefined,
    area: property?.area || undefined,
    description: property?.description || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.rent <= 0) newErrors.rent = 'Rent must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PropertyFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl">
            {isEdit ? 'Edit Property' : 'Add New Property'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Beautiful 2BR apartment downtown"
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, City, State"
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={errors.image ? 'border-destructive' : ''}
                />
                {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
              </div>
              
              <div>
                <Label htmlFor="rent">Monthly Rent ($) *</Label>
                <Input
                  id="rent"
                  type="number"
                  min="1"
                  value={formData.rent || ''}
                  onChange={(e) => handleInputChange('rent', parseInt(e.target.value) || 0)}
                  placeholder="1500"
                  className={errors.rent ? 'border-destructive' : ''}
                />
                {errors.rent && <p className="text-sm text-destructive mt-1">{errors.rent}</p>}
              </div>
              
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms || ''}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || undefined)}
                  placeholder="2"
                />
              </div>
              
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.bathrooms || ''}
                  onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value) || undefined)}
                  placeholder="2"
                />
              </div>
              
              <div>
                <Label htmlFor="area">Area (sq ft)</Label>
                <Input
                  id="area"
                  type="number"
                  min="1"
                  value={formData.area || ''}
                  onChange={(e) => handleInputChange('area', parseInt(e.target.value) || undefined)}
                  placeholder="1200"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your property..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary-hover">
              {isEdit ? 'Update Property' : 'Add Property'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
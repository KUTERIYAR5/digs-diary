import { Property } from '@/types/Property';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Edit, Trash2, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export const PropertyCard = ({ property, onEdit, onDelete }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            ${property.rent.toLocaleString()}/mo
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-start gap-1 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground line-clamp-2">{property.address}</p>
        </div>
        
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} bath</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.area} sqft</span>
              </div>
            )}
          </div>
        )}
        
        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {property.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(property)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(property.id)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
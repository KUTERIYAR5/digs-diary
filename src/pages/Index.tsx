import { useState, useEffect } from 'react';
import { Property, PropertyFormData } from '@/types/Property';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyForm } from '@/components/PropertyForm';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  loadProperties, 
  saveProperties, 
  addProperty, 
  updateProperty, 
  deleteProperty 
} from '@/utils/storage';
import { Search, Filter, MapPin, TrendingUp } from 'lucide-react';

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = loadProperties();
    setProperties(stored);
  }, []);

  const handleAddProperty = (data: PropertyFormData) => {
    try {
      const newProperty = addProperty(data);
      setProperties(prev => [...prev, newProperty]);
      setShowForm(false);
      toast({
        title: "Success!",
        description: "Property added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    }
  };

  const handleEditProperty = (data: PropertyFormData) => {
    if (!editingProperty) return;
    
    try {
      const updated = updateProperty(editingProperty.id, data);
      if (updated) {
        setProperties(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditingProperty(null);
        setShowForm(false);
        toast({
          title: "Success!",
          description: "Property updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const deleted = deleteProperty(id);
        if (deleted) {
          setProperties(prev => prev.filter(p => p.id !== id));
          toast({
            title: "Success!",
            description: "Property deleted successfully",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete property",
          variant: "destructive",
        });
      }
    }
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddProperty={() => setShowForm(true)} />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Rental
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing properties in your desired location
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search by location, property type..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-foreground"
              />
            </div>
            <Button variant="secondary" size="lg">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{properties.length}</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                Available Properties
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                ${properties.length > 0 ? Math.round(properties.reduce((acc, p) => acc + p.rent, 0) / properties.length).toLocaleString() : '0'}
              </div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Average Rent
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {properties.length > 0 ? Math.round(properties.reduce((acc, p) => acc + (p.area || 0), 0) / properties.length).toLocaleString() : '0'}
              </div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <Search className="h-4 w-4" />
                Avg Size (sq ft)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-muted rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No Properties Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start building your property portfolio by adding your first rental.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-primary hover:bg-primary-hover"
              >
                Add Your First Property
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Available Properties</h2>
                <p className="text-muted-foreground">
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={openEditForm}
                    onDelete={handleDeleteProperty}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty || undefined}
          onSubmit={editingProperty ? handleEditProperty : handleAddProperty}
          onCancel={closeForm}
          isEdit={!!editingProperty}
        />
      )}
    </div>
  );
};

export default Index;
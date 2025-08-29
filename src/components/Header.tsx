import { Button } from '@/components/ui/button';
import { Plus, Home } from 'lucide-react';

interface HeaderProps {
  onAddProperty: () => void;
}

export const Header = ({ onAddProperty }: HeaderProps) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-hero-gradient rounded-lg">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PropertyHub</h1>
              <p className="text-sm text-muted-foreground">Find your perfect rental</p>
            </div>
          </div>
          
          <Button 
            onClick={onAddProperty}
            className="bg-primary hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
    </header>
  );
};
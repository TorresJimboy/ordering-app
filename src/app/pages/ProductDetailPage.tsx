import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { products } from '../data/products';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/catalog')}>Return to Catalog</Button>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/catalog')}
          className="mb-6 text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/30 bg-secondary/30">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="mb-2">{product.name}</h1>
                  <Badge className="bg-accent text-accent-foreground capitalize">
                    {product.category}
                  </Badge>
                </div>
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Card className="p-6 bg-card/50 border-2 border-primary/30">
              <h3 className="mb-4 text-primary">Specifications</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex items-center justify-between pt-6 border-t-2 border-primary/30">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-4xl text-primary">${product.price}</p>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

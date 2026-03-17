import React, { useState } from 'react';
import { Link } from 'react-router';
import { products } from '../data/products';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export const CatalogPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen">
      <div 
        className="relative py-20 px-4"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1702753390018-76c147a55c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBwYXJjaG1lbnQlMjBwYXBlcnxlbnwxfHx8fDE3NzM1MTM1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="mb-4">Medieval Armory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover legendary weapons forged by master craftsmen. Each piece tells a story of valor and honor.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="bg-card border-2 border-primary/30">
              <TabsTrigger value="all">All Weapons</TabsTrigger>
              <TabsTrigger value="sword">Swords</TabsTrigger>
              <TabsTrigger value="axe">Axes</TabsTrigger>
              <TabsTrigger value="spear">Spears</TabsTrigger>
              <TabsTrigger value="shield">Shields</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden bg-secondary/30">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  {!product.inStock && (
                    <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl text-primary">${product.price}</span>
                  <Link to={`/product/${product.id}`}>
                    <Button 
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

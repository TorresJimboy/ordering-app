import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Package, Calendar, DollarSign } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600/20 text-green-400 border-green-600/50';
      case 'confirmed':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Order History</h1>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground">
              Your order history will appear here once you make your first purchase.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.slice().reverse().map(order => (
              <Card key={order.id} className="p-6 border-2 border-primary/30 hover:border-primary/60 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1">Order {order.id}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total</p>
                      <p className="text-xl text-primary">${order.total}</p>
                    </div>
                    <Badge className={`capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>

                {order.items.length > 0 && (
                  <div className="border-t border-primary/30 pt-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span className="text-muted-foreground">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

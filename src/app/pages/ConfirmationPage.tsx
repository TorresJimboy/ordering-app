import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4">Order Not Found</h2>
          <Button onClick={() => navigate('/catalog')}>Return to Catalog</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
            <h1 className="mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your legendary weapons are being prepared.
            </p>
          </div>

          <Card className="p-8 border-2 border-primary/30 text-left mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-xl text-primary">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="text-xl">{new Date(order.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-3xl text-primary">${order.total}</p>
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/orders')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Order History
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/catalog')}
              className="border-primary/30 hover:bg-primary/10"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="mt-12 p-6 bg-card/50 rounded-lg border border-primary/30">
            <h3 className="mb-2">What's Next?</h3>
            <p className="text-muted-foreground">
              You will receive a confirmation email shortly. Your weapons will be carefully packed 
              by our master craftsmen and shipped within 3-5 business days. Track your order status 
              in your order history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

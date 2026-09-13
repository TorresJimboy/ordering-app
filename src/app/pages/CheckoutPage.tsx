import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const CheckoutPage: React.FC = () => {
  const { user, cart, getCartTotal, createOrder } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Guest',
    email: user?.email.includes('@') ? user.email : 'guest@demo.local',
    address: '123 Demo Street',
    city: 'Demo City',
    postalCode: '12345'
  });

  if (completedOrderId) {
    return <Navigate to={`/confirmation/${completedOrderId}`} replace />;
  }

  if (cart.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const order = await createOrder();
      setCompletedOrderId(order.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to place demo order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 border-2 border-primary/30">
                <h3 className="mb-4">Shipping Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary/30">
                <h3 className="mb-4">Demo Checkout</h3>
                <p className="text-muted-foreground">
                  Place a sample order using the example shipping details above.
                  No payment is required, and nothing will be shipped.
                </p>
              </Card>

              {error && <p role="alert" className="text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Complete Demo Order'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-primary/30 sticky top-24">
              <h3 className="mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-primary/30 pt-3 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-xl pt-2">
                  <span>Total</span>
                  <span className="text-primary">${getCartTotal()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { Product } from '../data/products';
import { useApp } from '../contexts/AppContext';
import { useProducts } from '../hooks/useProducts';
import {
  createProduct,
  deleteProduct,
  importDefaultProducts,
  ProductFormData,
  updateProduct,
} from '../services/products';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Textarea } from '../components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

const emptyForm: ProductFormData = {
  name: '',
  category: 'sword',
  description: '',
  price: 0,
  image: '',
  inStock: true,
  specifications: [],
};

const toFormData = (product: Product): ProductFormData => ({
  name: product.name,
  category: product.category,
  description: product.description,
  price: product.price,
  image: product.image,
  inStock: product.inStock,
  specifications: product.specifications,
});

const getSaveErrorMessage = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'permission-denied'
  ) {
    return 'Permission denied. Check that you are logged in with an admin email and that Firestore rules are published.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to save product';
};

export const AdminProductsPage: React.FC = () => {
  const { isAdmin, isAuthLoading } = useApp();
  const { products, isLoading, isUsingDefaults } = useProducts();
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [specificationsText, setSpecificationsText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(editingProductId);
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );

  if (!isAuthLoading && !isAdmin) {
    return <Navigate to="/catalog" replace />;
  }

  const resetForm = () => {
    setEditingProductId(null);
    setFormData(emptyForm);
    setSpecificationsText('');
  };

  const startEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData(toFormData(product));
    setSpecificationsText(product.specifications.join('\n'));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const nextProduct = {
      ...formData,
      price: Number(formData.price),
      specifications: specificationsText
        .split('\n')
        .map((specification) => specification.trim())
        .filter(Boolean),
    };

    const savePromise = editingProductId
      ? updateProduct(editingProductId, nextProduct)
      : createProduct(nextProduct);

    toast.promise(savePromise, {
      loading: editingProductId ? 'Saving changes...' : 'Creating product...',
      success: editingProductId ? 'Product updated' : 'Product created',
      error: getSaveErrorMessage,
    });

    resetForm();
    setIsSaving(false);
  };

  const handleDelete = async (productId: string) => {
    const deletePromise = deleteProduct(productId);

    toast.promise(deletePromise, {
      loading: 'Deleting product...',
      success: 'Product deleted',
      error: getSaveErrorMessage,
    });

    if (editingProductId === productId) {
      resetForm();
    }
  };

  const handleImportDefaults = async () => {
    try {
      const didImport = await importDefaultProducts();
      toast.success(didImport ? 'Default products imported' : 'Products collection already has items');
    } catch (error) {
      toast.error(getSaveErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2">Product Admin</h1>
            <p className="text-muted-foreground">
              Manage the Firestore catalog used by the shop.
            </p>
          </div>

          <Button onClick={handleImportDefaults} variant="outline">
            <Plus className="mr-2 size-4" />
            Import Defaults
          </Button>
        </div>

        {isUsingDefaults && (
          <Card className="mb-6 border-2 border-primary/30 bg-card/70 p-4 text-sm text-muted-foreground">
            Firestore has no products yet. Use Import Defaults or create a product below.
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <Card className="border-2 border-primary/30 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2>Products</h2>
              <Badge variant="secondary">{isLoading ? 'Loading' : `${sortedProducts.length} items`}</Badge>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {product.inStock ? (
                        <Badge>In Stock</Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                          <Edit className="size-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="hover:text-destructive">
                              <Trash2 className="size-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete product?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This removes {product.name} from Firestore.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(product.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="border-2 border-primary/30 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2>{isEditing ? 'Edit Product' : 'New Product'}</h2>
              {isEditing && (
                <Button size="sm" variant="ghost" onClick={resetForm}>
                  <X className="mr-2 size-4" />
                  Clear
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(category: Product['category']) => setFormData({ ...formData, category })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sword">Sword</SelectItem>
                      <SelectItem value="axe">Axe</SelectItem>
                      <SelectItem value="spear">Spear</SelectItem>
                      <SelectItem value="shield">Shield</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    inputMode="decimal"
                    value={formData.price === 0 ? '' : String(formData.price)}
                    onChange={(event) => {
                      const nextPrice = event.target.value.replace(/[^\d.]/g, '');
                      setFormData({ ...formData, price: nextPrice === '' ? 0 : Number(nextPrice) });
                    }}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                  placeholder="/ordering-app/images/longsword.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  value={specificationsText}
                  onChange={(event) => setSpecificationsText(event.target.value)}
                  placeholder="Blade Length: 36 inches"
                  className="min-h-28"
                />
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <Label htmlFor="inStock">In stock</Label>
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(inStock) => setFormData({ ...formData, inStock })}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSaving}>
                <Save className="mr-2 size-4" />
                {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Product'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

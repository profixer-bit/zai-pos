'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  CreditCard,
  Smartphone,
  Wallet,
  Search,
  Printer,
  User,
  Package,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  sellingPrice: number;
  currentStock: number;
  image?: string;
}

type PaymentMethod = 'CASH' | 'CARD' | 'QR_CODE' | 'E_WALLET';

const paymentMethods = [
  { value: 'CASH' as PaymentMethod, label: 'Cash', icon: DollarSign },
  { value: 'CARD' as PaymentMethod, label: 'Card', icon: CreditCard },
  { value: 'QR_CODE' as PaymentMethod, label: 'QR Code', icon: Smartphone },
  { value: 'E_WALLET' as PaymentMethod, label: 'E-Wallet', icon: Wallet },
];

export function POSManagement() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('CASH');
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(10);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro Screen',
      sku: 'IP14P-SCR',
      category: 'Screens',
      sellingPrice: 350,
      currentStock: 12,
    },
    {
      id: '2',
      name: 'iPhone 13 Screen',
      sku: 'IP13-SCR',
      category: 'Screens',
      sellingPrice: 250,
      currentStock: 3,
    },
    {
      id: '3',
      name: 'Samsung S23 Battery',
      sku: 'SS23-BAT',
      category: 'Batteries',
      sellingPrice: 80,
      currentStock: 20,
    },
    {
      id: '4',
      name: 'iPad Air 4 Charging Port',
      sku: 'IPA4-CHG',
      category: 'Charging',
      sellingPrice: 120,
      currentStock: 2,
    },
    {
      id: '5',
      name: 'iPhone 12 Battery',
      sku: 'IP12-BAT',
      category: 'Batteries',
      sellingPrice: 70,
      currentStock: 15,
    },
    {
      id: '6',
      name: 'MacBook Pro SSD 512GB',
      sku: 'MBP-SSD512',
      category: 'Storage',
      sellingPrice: 400,
      currentStock: 8,
    },
    {
      id: '7',
      name: 'USB-C Cable 2m',
      sku: 'USB-C-2M',
      category: 'Accessories',
      sellingPrice: 15,
      currentStock: 50,
    },
  ]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.currentStock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * item.price,
                }
              : item
          )
        );
      }
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.sellingPrice,
          quantity: 1,
          total: product.sellingPrice,
        },
      ]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const product = products.find((p) => p.id === itemId);
    if (product && quantity <= product.currentStock) {
      setCart(
        cart.map((item) =>
          item.id === itemId
            ? { ...item, quantity, total: quantity * item.price }
            : item
        )
      );
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    console.log('Checkout:', {
      items: cart,
      customer: selectedCustomer,
      subtotal,
      discount,
      discountAmount,
      tax,
      taxAmount,
      total,
      paymentMethod: selectedPaymentMethod,
    });

    alert('Checkout successful! Inventory has been updated.');
    setCart([]);
    setSelectedCustomer('');
    setDiscount(0);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,567</div>
            <p className="text-xs text-muted-foreground mt-1">23 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cart Items
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cart.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cart Total
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Products Grid */}
        <div className="lg:col-span-2 space-y-4">
          {/* Customer Selection */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="customer">Customer (Optional)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customer"
                      placeholder="Select or add customer..."
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Dialog
                  open={isCustomerDialogOpen}
                  onOpenChange={setIsCustomerDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="self-end">Add Customer</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                      <DialogDescription>
                        Enter customer details for this sale
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-customer-name">Name</Label>
                        <Input id="new-customer-name" placeholder="Customer name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-customer-phone">Phone</Label>
                        <Input id="new-customer-phone" placeholder="Phone number" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-customer-email">Email</Label>
                        <Input
                          id="new-customer-email"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCustomerDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCustomerDialogOpen(false)}>
                        Add & Select
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Product Search */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[500px] overflow-y-auto">
                {filteredProducts.map((product) => {
                  const isOutOfStock = product.currentStock === 0;
                  const cartItem = cart.find((item) => item.id === product.id);
                  const inCart = cartItem ? cartItem.quantity : 0;

                  return (
                    <Card
                      key={product.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        isOutOfStock ? 'opacity-50' : 'hover:border-primary'
                      }`}
                      onClick={() => !isOutOfStock && addToCart(product)}
                    >
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <Badge variant="secondary">{product.category}</Badge>
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              SKU: {product.sku}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">
                              ${product.sellingPrice}
                            </p>
                            <Badge
                              variant={
                                product.currentStock <= 5
                                  ? 'destructive'
                                  : 'default'
                              }
                            >
                              {product.currentStock} in stock
                            </Badge>
                          </div>
                          {inCart > 0 && (
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <ShoppingCart className="h-4 w-4" />
                              <span>{inCart} in cart</span>
                            </div>
                          )}
                          {isOutOfStock && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span>Out of stock</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart */}
        <div className="space-y-4">
          <Card className="sticky top-20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Shopping Cart</CardTitle>
                <Badge variant="secondary">{cart.length} items</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add products to start selling
                  </p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground">Discount</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="w-16 h-8 text-right"
                        />
                        <span className="w-8 text-right text-red-500">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground">Tax ({tax}%)</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={tax}
                          onChange={(e) => setTax(Number(e.target.value))}
                          className="w-16 h-8 text-right"
                        />
                        <span className="w-16 text-right">
                          ${taxAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Dialog
                    open={isCheckoutOpen}
                    onOpenChange={setIsCheckoutOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={cart.length === 0}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Proceed to Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription>
                          Complete the payment for this order
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {/* Payment Method Selection */}
                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {paymentMethods.map((method) => {
                              const Icon = method.icon;
                              return (
                                <button
                                  key={method.value}
                                  onClick={() =>
                                    setSelectedPaymentMethod(method.value)
                                  }
                                  className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                                    selectedPaymentMethod === method.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <Icon className="h-5 w-5" />
                                  <span className="font-medium">
                                    {method.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Items ({cart.length})
                            </span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          {discount > 0 && (
                            <div className="flex justify-between text-red-500">
                              <span>Discount ({discount}%)</span>
                              <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax ({tax}%)</span>
                            <span>${taxAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t">
                            <span>Total</span>
                            <span className="text-primary">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Customer Info */}
                        {selectedCustomer && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-sm font-medium mb-1">Customer</p>
                            <p className="text-sm">{selectedCustomer}</p>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsCheckoutOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleCheckout} className="gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Complete Payment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Print Receipt Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={cart.length === 0}
                    onClick={() => alert('Printing receipt...')}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

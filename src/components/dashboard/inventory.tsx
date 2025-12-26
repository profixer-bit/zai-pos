'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minStock: number;
  location?: string;
  supplier?: string;
  image?: string;
}

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'normal'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [inventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro Screen',
      sku: 'IP14P-SCR',
      category: 'Screens',
      costPrice: 180,
      sellingPrice: 350,
      currentStock: 12,
      minStock: 5,
      location: 'A-1',
      supplier: 'TechParts Inc',
    },
    {
      id: '2',
      name: 'iPhone 13 Screen',
      sku: 'IP13-SCR',
      category: 'Screens',
      costPrice: 120,
      sellingPrice: 250,
      currentStock: 3,
      minStock: 5,
      location: 'A-2',
      supplier: 'TechParts Inc',
    },
    {
      id: '3',
      name: 'Samsung S23 Battery',
      sku: 'SS23-BAT',
      category: 'Batteries',
      costPrice: 25,
      sellingPrice: 80,
      currentStock: 20,
      minStock: 10,
      location: 'B-1',
      supplier: 'BatteryPro',
    },
    {
      id: '4',
      name: 'iPad Air 4 Charging Port',
      sku: 'IPA4-CHG',
      category: 'Charging',
      costPrice: 35,
      sellingPrice: 120,
      currentStock: 2,
      minStock: 5,
      location: 'C-3',
      supplier: 'QuickFix Parts',
    },
    {
      id: '5',
      name: 'iPhone 12 Battery',
      sku: 'IP12-BAT',
      category: 'Batteries',
      costPrice: 20,
      sellingPrice: 70,
      currentStock: 15,
      minStock: 8,
      location: 'B-2',
      supplier: 'BatteryPro',
    },
    {
      id: '6',
      name: 'MacBook Pro SSD 512GB',
      sku: 'MBP-SSD512',
      category: 'Storage',
      costPrice: 150,
      sellingPrice: 400,
      currentStock: 8,
      minStock: 3,
      location: 'D-1',
      supplier: 'Storage Solutions',
    },
    {
      id: '7',
      name: 'USB-C Cable 2m',
      sku: 'USB-C-2M',
      category: 'Accessories',
      costPrice: 3,
      sellingPrice: 15,
      currentStock: 50,
      minStock: 20,
      location: 'E-1',
      supplier: 'CableMaster',
    },
  ]);

  const categories = ['Screens', 'Batteries', 'Charging', 'Storage', 'Accessories', 'Tools'];

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    let matchesStock = true;
    if (filterStock === 'low') {
      matchesStock = item.currentStock <= item.minStock;
    } else if (filterStock === 'normal') {
      matchesStock = item.currentStock > item.minStock;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock);
  const totalValue = inventory.reduce((sum, item) => sum + item.costPrice * item.currentStock, 0);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStock} onValueChange={(v: 'all' | 'low' | 'normal') => setFilterStock(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Stock Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>
                Enter the inventory item details
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input id="name" placeholder="Item name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" placeholder="Stock keeping unit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost Price *</Label>
                  <Input id="cost" type="number" placeholder="$0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selling">Selling Price *</Label>
                  <Input id="selling" type="number" placeholder="$0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current">Current Stock *</Label>
                  <Input id="current" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="min">Min Stock *</Label>
                  <Input id="min" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., A-1" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Supplier name" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{lowStockItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quantity
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.reduce((sum, item) => sum + item.currentStock, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-500">
          <CardHeader className="bg-orange-50 dark:bg-orange-950">
            <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                  </div>
                  <Badge variant="destructive">
                    {item.currentStock} / {item.minStock}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory ({filteredItems.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Selling</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const isLowStock = item.currentStock <= item.minStock;
                  const totalValue = item.costPrice * item.currentStock;

                  return (
                    <TableRow key={item.id} className={isLowStock ? 'bg-orange-50/50' : ''}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.sku}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={isLowStock ? 'destructive' : 'default'}
                          className={isLowStock ? '' : 'bg-green-500 hover:bg-green-600'}
                        >
                          {item.currentStock}
                        </Badge>
                      </TableCell>
                      <TableCell>${item.costPrice}</TableCell>
                      <TableCell>${item.sellingPrice}</TableCell>
                      <TableCell className="font-medium">
                        ${totalValue.toLocaleString()}
                      </TableCell>
                      <TableCell>{item.location || '-'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUp className="mr-2 h-4 w-4" />
                              Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowDown className="mr-2 h-4 w-4" />
                              Remove Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the inventory item details
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input id="edit-name" defaultValue={selectedItem.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sku">SKU</Label>
                <Input id="edit-sku" defaultValue={selectedItem.sku} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select defaultValue={selectedItem.category}>
                  <SelectTrigger id="edit-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-cost">Cost Price</Label>
                  <Input
                    id="edit-cost"
                    type="number"
                    defaultValue={selectedItem.costPrice}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-selling">Selling Price</Label>
                  <Input
                    id="edit-selling"
                    type="number"
                    defaultValue={selectedItem.sellingPrice}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-current">Current Stock</Label>
                  <Input
                    id="edit-current"
                    type="number"
                    defaultValue={selectedItem.currentStock}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-min">Min Stock</Label>
                  <Input
                    id="edit-min"
                    type="number"
                    defaultValue={selectedItem.minStock}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input id="edit-location" defaultValue={selectedItem.location} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-supplier">Supplier</Label>
                <Input id="edit-supplier" defaultValue={selectedItem.supplier} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

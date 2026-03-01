"use client"

import { useState } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Package, ShoppingCart, Plus, Edit, Trash2, DollarSign } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/lib/store-data"
import { statusLabels } from "@/lib/store-data"

export default function SellerDashboard() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "إلكترونيات",
    stock: "",
  })

  const sellerOrders = orders
  const totalSales = sellerOrders.reduce((sum, o) => sum + o.total, 0)

  function resetForm() {
    setForm({ name: "", description: "", price: "", category: "إلكترونيات", stock: "" })
  }

  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault()
    addProduct({
      id: `p${Date.now()}`,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: "/images/products/headphones.jpg",
      category: form.category,
      seller: "متجري",
      stock: parseInt(form.stock),
    })
    resetForm()
    setAddOpen(false)
    toast.success("تمت إضافة المنتج بنجاح")
  }

  function handleEditProduct(e: React.FormEvent) {
    e.preventDefault()
    if (!editProduct) return
    updateProduct({
      ...editProduct,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
    })
    setEditProduct(null)
    resetForm()
    toast.success("تم تحديث المنتج بنجاح")
  }

  function openEdit(product: Product) {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
    })
  }

  function handleDelete(id: string) {
    deleteProduct(id)
    toast.success("تم حذف المنتج")
  }

  const productForm = (
    onSubmit: (e: React.FormEvent) => void,
    submitLabel: string
  ) => (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>اسم المنتج</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="اسم المنتج"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>الوصف</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="وصف المنتج"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>السعر ($)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>المخزون</Label>
          <Input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>الفئة</Label>
        <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
            <SelectItem value="ملابس">ملابس</SelectItem>
            <SelectItem value="المنزل">المنزل</SelectItem>
            <SelectItem value="رياضة">رياضة</SelectItem>
            <SelectItem value="إكسسوارات">إكسسوارات</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              لوحة تحكم البائع
            </h1>
            <p className="mt-1 text-muted-foreground">
              إدارة منتجاتك وطلباتك.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">منتجاتي</p>
                  <p className="text-2xl font-bold text-foreground">{products.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-foreground">{sellerOrders.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                  <p className="text-2xl font-bold text-foreground">${totalSales.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">
                <Package className="ml-1 h-4 w-4" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingCart className="ml-1 h-4 w-4" />
                الطلبات
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    منتجاتي
                  </CardTitle>
                  <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={resetForm}>
                        <Plus className="ml-1 h-4 w-4" />
                        إضافة منتج
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                          إضافة منتج جديد
                        </DialogTitle>
                      </DialogHeader>
                      {productForm(handleAddProduct, "إضافة منتج")}
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden border-border">
                        <div className="relative aspect-video overflow-hidden bg-secondary">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{product.name}</h3>
                              <Badge variant="outline" className="mt-1">{product.category}</Badge>
                            </div>
                            <span className="text-lg font-bold text-foreground">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {product.description}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            المخزون: {product.stock}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <Dialog
                              open={editProduct?.id === product.id}
                              onOpenChange={(open) => {
                                if (!open) setEditProduct(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEdit(product)}
                                >
                                  <Edit className="ml-1 h-4 w-4" />
                                  تعديل
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                                    تعديل المنتج
                                  </DialogTitle>
                                </DialogHeader>
                                {productForm(handleEditProduct, "حفظ التغييرات")}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="ml-1 h-4 w-4 text-destructive" />
                              حذف
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    الطلبات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم الطلب</TableHead>
                          <TableHead>العميل</TableHead>
                          <TableHead>المنتجات</TableHead>
                          <TableHead>المجموع</TableHead>
                          <TableHead>التاريخ</TableHead>
                          <TableHead>الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sellerOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-sm">{order.id}</TableCell>
                            <TableCell className="font-medium">{order.userName}</TableCell>
                            <TableCell>
                              {order.products.map((p) => p.name).join("، ")}
                            </TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(v) =>
                                  updateOrderStatus(order.id, v as typeof order.status)
                                }
                              >
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                                  <SelectItem value="shipped">تم الشحن</SelectItem>
                                  <SelectItem value="delivered">تم التوصيل</SelectItem>
                                  <SelectItem value="cancelled">ملغي</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

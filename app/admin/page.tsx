"use client"

import { useState } from "react"
import { useStore } from "@/lib/store-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Plus,
  Trash2,
  BarChart3,
} from "lucide-react"
import { toast } from "sonner"
import { statusLabels, roleLabels } from "@/lib/store-data"

export default function AdminDashboard() {
  const { products, users, orders, addUser, deleteUser, deleteProduct, updateOrderStatus } = useStore()
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState<"user" | "seller" | "admin">("user")
  const [addUserOpen, setAddUserOpen] = useState(false)

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault()
    if (!newUserName || !newUserEmail) return
    addUser({
      id: `u${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      joined: new Date().toISOString().split("T")[0],
      status: "active",
    })
    setNewUserName("")
    setNewUserEmail("")
    setNewUserRole("user")
    setAddUserOpen(false)
    toast.success("تمت إضافة المستخدم بنجاح")
  }

  function handleDeleteUser(id: string) {
    deleteUser(id)
    toast.success("تم حذف المستخدم")
  }

  function handleDeleteProduct(id: string) {
    deleteProduct(id)
    toast.success("تم حذف المنتج")
  }

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
              لوحة تحكم المسؤول
            </h1>
            <p className="mt-1 text-muted-foreground">
              إدارة المستخدمين والمنتجات وعرض التقارير.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المنتجات</p>
                  <p className="text-2xl font-bold text-foreground">{products.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <ShoppingCart className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                  <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الإيرادات</p>
                  <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">
                <Users className="ml-1 h-4 w-4" />
                المستخدمون
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="ml-1 h-4 w-4" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="reports">
                <BarChart3 className="ml-1 h-4 w-4" />
                التقارير
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    إدارة المستخدمين
                  </CardTitle>
                  <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="ml-1 h-4 w-4" />
                        إضافة مستخدم
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                          إضافة مستخدم جديد
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>الاسم</Label>
                          <Input
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="الاسم الكامل"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>البريد الإلكتروني</Label>
                          <Input
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="email@example.com"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>الدور</Label>
                          <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as "user" | "seller" | "admin")}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">مستخدم</SelectItem>
                              <SelectItem value="seller">بائع</SelectItem>
                              <SelectItem value="admin">مسؤول</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit">إضافة مستخدم</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الاسم</TableHead>
                          <TableHead>البريد الإلكتروني</TableHead>
                          <TableHead>الدور</TableHead>
                          <TableHead>تاريخ الانضمام</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead className="text-left">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "default"
                                    : user.role === "seller"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {roleLabels[user.role]}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joined}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                {statusLabels[user.status]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-left">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    إدارة المنتجات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المنتج</TableHead>
                          <TableHead>الفئة</TableHead>
                          <TableHead>البائع</TableHead>
                          <TableHead>السعر</TableHead>
                          <TableHead>المخزون</TableHead>
                          <TableHead className="text-left">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell>{product.seller}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell className="text-left">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                      ملخص الطلبات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {(["pending", "shipped", "delivered", "cancelled"] as const).map((status) => {
                        const count = orders.filter((o) => o.status === status).length
                        const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0
                        return (
                          <div key={status} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{statusLabels[status]}</span>
                              <span className="text-muted-foreground">{count} طلبات</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                              <div
                                className="h-2 rounded-full bg-primary transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                      أحدث الطلبات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {orders.slice(-5).reverse().map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between rounded-lg border border-border p-3"
                        >
                          <div>
                            <p className="font-medium text-foreground">{order.userName}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.products.length} منتجات - ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <Select
                            value={order.status}
                            onValueChange={(v) => updateOrderStatus(order.id, v as typeof order.status)}
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
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                      المستخدمون حسب الدور
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {(["admin", "seller", "user"] as const).map((role) => {
                        const count = users.filter((u) => u.role === role).length
                        return (
                          <div
                            key={role}
                            className="flex flex-col items-center rounded-lg border border-border p-6"
                          >
                            <p className="text-3xl font-bold text-foreground">{count}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{roleLabels[role]}</p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, checkout } = useStore()
  const router = useRouter()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    checkout()
    setOrderPlaced(true)
    toast.success("تم تأكيد الطلب بنجاح!")
  }

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <h2
            className="mt-4 text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            تم تأكيد الطلب!
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            شكراً لك على الشراء. طلبك قيد المعالجة.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/shop">متابعة التسوق</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (cart.length === 0) {
    router.push("/shop/cart")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/shop/cart">
              <ArrowRight className="ml-1 h-4 w-4" />
              العودة للسلة
            </Link>
          </Button>

          <h1
            className="mb-8 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            إتمام الشراء
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleCheckout} className="flex flex-col gap-6">
                {/* Shipping Info */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                      معلومات الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input id="firstName" placeholder="أحمد" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="lastName">اسم العائلة</Label>
                        <Input id="lastName" placeholder="محمد" required />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="ahmed@example.com" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Input id="address" placeholder="123 شارع الرئيسي" required />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="city">المدينة</Label>
                        <Input id="city" placeholder="القاهرة" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="state">المنطقة</Label>
                        <Input id="state" placeholder="القاهرة" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="zip">الرمز البريدي</Label>
                        <Input id="zip" placeholder="11511" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Info */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                      تفاصيل الدفع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="cardNumber">رقم البطاقة</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full">
                  تأكيد الطلب - ${total.toFixed(2)}
                </Button>
              </form>
            </div>

            {/* Summary */}
            <div>
              <Card className="sticky top-24 border-border">
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    ملخص الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "مجاني" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">المجموع</span>
                    <span className="text-xl font-bold text-foreground">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

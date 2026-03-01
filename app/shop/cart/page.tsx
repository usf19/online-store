"use client"

import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/lib/store-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useStore()

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
          <h2
            className="mt-4 text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            سلة التسوق فارغة
          </h2>
          <p className="mt-2 text-muted-foreground">
            أضف بعض المنتجات للبدء.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/shop">تصفح المتجر</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/shop">
              <ArrowRight className="ml-1 h-4 w-4" />
              متابعة التسوق
            </Link>
          </Button>

          <h1
            className="mb-8 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            سلة التسوق
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <Card key={item.product.id} className="border-border">
                    <CardContent className="flex gap-4 p-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 border-border">
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    ملخص الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      المجموع الفرعي ({cart.reduce((s, i) => s + i.quantity, 0)} منتجات)
                    </span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "مجاني" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 50 && (
                    <p className="text-xs text-muted-foreground">
                      أضف ${(50 - subtotal).toFixed(2)} للحصول على شحن مجاني.
                    </p>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">المجموع</span>
                    <span className="text-xl font-bold text-foreground">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/shop/checkout">متابعة الدفع</Link>
                  </Button>
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

"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useStore } from "@/lib/store-context"
import { ArrowLeft, ShoppingBag, Truck, Shield, Star } from "lucide-react"

export default function HomePage() {
  const { products } = useStore()
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="خلفية المتجر"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:py-36">
            <h1
              className="text-4xl font-bold tracking-tight text-white md:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-balance">اكتشف منتجات عالية الجودة</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80 text-pretty">
              تسوق منتجات مختارة بعناية من بائعين موثوقين. جودة عالية، توصيل سريع، وخدمة عملاء استثنائية.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">
                  تصفح المتجر
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">انضم الآن</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6">
            {[
              {
                icon: ShoppingBag,
                title: "تشكيلة مختارة",
                desc: "منتجات مختارة بعناية من بائعين موثوقين حول العالم.",
              },
              {
                icon: Truck,
                title: "شحن سريع",
                desc: "شحن مجاني للطلبات فوق 50 دولار. يتم التوصيل خلال 2-5 أيام عمل.",
              },
              {
                icon: Shield,
                title: "دفع آمن",
                desc: "بياناتك محمية بأحدث تقنيات التشفير.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-lg p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-foreground md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                منتجات مميزة
              </h2>
              <Button variant="ghost" asChild>
                <Link href="/shop">
                  عرض الكل <ArrowLeft className="mr-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-border transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {product.category}
                    </p>
                    <h3 className="mt-1 font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? "fill-accent text-accent" : "text-border"}`}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button size="sm" asChild>
                        <Link href="/shop">اشتر الآن</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2
              className="text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              هل أنت مستعد للبيع؟
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">
              انضم إلى Oline Story System كبائع وتواصل مع آلاف العملاء.
              إعداد سهل، أدوات قوية، ودعم مخصص.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/seller">لوحة البائع</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/admin">لوحة المسؤول</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

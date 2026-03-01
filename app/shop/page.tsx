"use client"

import { useState } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/store-data"
import { Search, ShoppingCart, Star } from "lucide-react"
import { toast } from "sonner"

export default function ShopPage() {
  const { products, addToCart } = useStore()
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("الكل")

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "الكل" || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  function handleAddToCart(product: typeof products[0]) {
    addToCart(product)
    toast.success(`تمت إضافة ${product.name} إلى السلة`)
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
              المتجر
            </h1>
            <p className="mt-1 text-muted-foreground">
              تصفح مجموعتنا المختارة من المنتجات عالية الجودة.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ابحث عن منتجات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg font-medium text-foreground">لم يتم العثور على منتجات</p>
              <p className="mt-1 text-sm text-muted-foreground">
                حاول تعديل البحث أو معايير التصفية.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
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
                    <Badge className="absolute right-3 top-3">{product.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? "fill-accent text-accent" : "text-border"}`}
                        />
                      ))}
                      <span className="mr-1 text-xs text-muted-foreground">(4.0)</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      البائع: {product.seller}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button size="sm" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="ml-1 h-4 w-4" />
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

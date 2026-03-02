"use client"

import Link from "next/link"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  User,
  LogOut,
  Store,
  Shield,
  Package,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const { currentUser, cart, logout } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Onlin Store System
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">الرئيسية</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/shop">المتجر</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">اتصل بنا</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">
              <Shield className="ml-1 h-4 w-4" />
              المسؤول
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/seller">
              <Package className="ml-1 h-4 w-4" />
              البائع
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link href="/shop/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {currentUser ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/login">
                <User className="ml-1 h-4 w-4" />
                تسجيل الدخول
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link href="/">الرئيسية</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link href="/shop">المتجر</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link href="/contact">اتصل بنا</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link href="/admin">المسؤول</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link href="/seller">البائع</Link>
            </Button>
            {currentUser ? (
              <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileOpen(false) }}>
                <LogOut className="ml-1 h-4 w-4" /> تسجيل الخروج ({currentUser.name})
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild onClick={() => setMobileOpen(false)}>
                <Link href="/login">تسجيل الدخول / إنشاء حساب</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

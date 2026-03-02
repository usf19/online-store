import Link from "next/link"
import { Store } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Oline Store System
          </span>
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
          <Link href="/shop" className="hover:text-foreground transition-colors">المتجر</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">اتصل بنا</Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          {'© 2026 Onlin Store System. جميع الحقوق محفوظة.'}
        </p>
      </div>
    </footer>
  )
}

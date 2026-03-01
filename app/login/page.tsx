"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Store, ArrowRight } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const { login } = useStore()
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerRole, setRegisterRole] = useState<"user" | "seller" | "admin">("user")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!loginEmail) return
    login(loginEmail, "user")
    toast.success("تم تسجيل الدخول بنجاح!")
    router.push("/shop")
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!registerEmail || !registerName) return
    login(registerEmail, registerRole)
    toast.success("تم إنشاء الحساب بنجاح!")
    if (registerRole === "admin") router.push("/admin")
    else if (registerRole === "seller") router.push("/seller")
    else router.push("/shop")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Store className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                شوب فيرس
              </span>
            </Link>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>مرحباً بعودتك</CardTitle>
                  <CardDescription>سجل دخولك إلى حسابك في شوب فيرس.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="login-email">البريد الإلكتروني</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="login-password">كلمة المرور</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="أدخل كلمة المرور"
                        defaultValue="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      تسجيل الدخول
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>إنشاء حساب</CardTitle>
                  <CardDescription>انضم إلى شوب فيرس كمستخدم أو بائع أو مسؤول.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="register-name">الاسم الكامل</Label>
                      <Input
                        id="register-name"
                        placeholder="أحمد محمد"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="register-email">البريد الإلكتروني</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="register-password">كلمة المرور</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="أنشئ كلمة مرور"
                        defaultValue="password"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="register-role">نوع الحساب</Label>
                      <Select value={registerRole} onValueChange={(v) => setRegisterRole(v as "user" | "seller" | "admin")}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الحساب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">مستخدم (متسوق)</SelectItem>
                          <SelectItem value="seller">بائع</SelectItem>
                          <SelectItem value="admin">مسؤول</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">
                      إنشاء حساب
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowRight className="ml-1 h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

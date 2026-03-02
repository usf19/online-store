"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    toast.success("تم إرسال الرسالة! سنرد عليك قريباً.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1
              className="text-3xl font-bold text-foreground md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              اتصل بنا
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              هل لديك أسئلة أو ملاحظات؟ نحب أن نسمع منك.
              تواصل معنا وسيرد فريقنا خلال 24 ساعة.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: Mail,
                  title: "البريد الإلكتروني",
                  detail: "support@shopverse.com",
                  sub: "نرد خلال 24 ساعة",
                },
                {
                  icon: Phone,
                  title: "الهاتف",
                  detail: "01200762253",
                  sub: "الأحد-الخميس، 9ص-6م",
                },
                {
                  icon: MapPin,
                  title: "المكتب",
                  detail: "شارع الكحله",
                  sub: "شما اشمون منوفيه",
                },
                {
                  icon: Clock,
                  title: "ساعات العمل",
                  detail: "الأحد - الخميس",
                  sub: "9:00 صباحاً - 6:00 مساءً",
                },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-foreground">{item.detail}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: "var(--font-heading)" }}>
                    أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3
                        className="mt-4 text-xl font-bold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        تم إرسال الرسالة!
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        شكراً لتواصلك معنا. سنرد عليك قريباً.
                      </p>
                      <Button className="mt-6" onClick={() => setSubmitted(false)}>
                        إرسال رسالة أخرى
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="contact-name">الاسم</Label>
                          <Input id="contact-name" placeholder="اسمك" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="contact-email">البريد الإلكتروني</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="contact-subject">الموضوع</Label>
                        <Input
                          id="contact-subject"
                          placeholder="كيف يمكننا مساعدتك؟"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="contact-message">الرسالة</Label>
                        <Textarea
                          id="contact-message"
                          placeholder="أخبرنا المزيد عن استفسارك..."
                          rows={6}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg">
                        <Send className="ml-2 h-4 w-4" />
                        إرسال الرسالة
                      </Button>
                    </form>
                  )}
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

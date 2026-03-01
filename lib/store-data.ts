export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  seller: string
  stock: number
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "seller" | "user"
  joined: string
  status: "active" | "inactive"
}

export interface Order {
  id: string
  userId: string
  userName: string
  products: { productId: string; name: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  date: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  active: "نشط",
  inactive: "غير نشط",
}

export const roleLabels: Record<string, string> = {
  admin: "مسؤول",
  seller: "بائع",
  user: "مستخدم",
}

export const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "سماعات لاسلكية",
    description: "سماعات لاسلكية فاخرة بخاصية إلغاء الضوضاء وبطارية تدوم 30 ساعة.",
    price: 89.99,
    image: "/images/products/headphones.jpg",
    category: "إلكترونيات",
    seller: "تك جير",
    stock: 45,
  },
  {
    id: "p2",
    name: "تيشيرت قطن عضوي",
    description: "تيشيرت ناعم من القطن العضوي المستدام بقصة عصرية مريحة.",
    price: 34.99,
    image: "/images/products/tshirt.jpg",
    category: "ملابس",
    seller: "إيكو وير",
    stock: 120,
  },
  {
    id: "p3",
    name: "كوب قهوة سيراميك",
    description: "كوب سيراميك مصنوع يدوياً بتصميم بسيط، سعة 12 أونصة.",
    price: 18.50,
    image: "/images/products/mug.jpg",
    category: "المنزل",
    seller: "منتجات حرفية",
    stock: 78,
  },
  {
    id: "p4",
    name: "حذاء رياضي للجري",
    description: "حذاء جري خفيف الوزن مع توسيد فائق واستجابة عالية.",
    price: 129.00,
    image: "/images/products/shoes.jpg",
    category: "رياضة",
    seller: "فيت سترايد",
    stock: 30,
  },
  {
    id: "p5",
    name: "حقيبة ظهر جلدية",
    description: "حقيبة ظهر من الجلد الطبيعي مع جيب للكمبيوتر المحمول وجيوب تنظيمية.",
    price: 159.00,
    image: "/images/products/backpack.jpg",
    category: "إكسسوارات",
    seller: "أوربان كرافت",
    stock: 22,
  },
  {
    id: "p6",
    name: "ساعة ذكية",
    description: "متتبع لياقة وساعة ذكية مع مراقب نبضات القلب ونظام GPS.",
    price: 199.99,
    image: "/images/products/watch.jpg",
    category: "إلكترونيات",
    seller: "تك جير",
    stock: 60,
  },
  {
    id: "p7",
    name: "مجموعة شموع معطرة",
    description: "مجموعة من 3 شموع صويا مصبوبة يدوياً بروائح اللافندر والفانيليا وخشب الصندل.",
    price: 42.00,
    image: "/images/products/candles.jpg",
    category: "المنزل",
    seller: "منتجات حرفية",
    stock: 95,
  },
  {
    id: "p8",
    name: "سجادة يوغا",
    description: "سجادة يوغا صديقة للبيئة مانعة للانزلاق مع حزام حمل. سمك 6 مم.",
    price: 49.99,
    image: "/images/products/yogamat.jpg",
    category: "رياضة",
    seller: "فيت سترايد",
    stock: 55,
  },
]

export const sampleUsers: User[] = [
  { id: "u1", name: "أحمد محمد", email: "ahmed@example.com", role: "admin", joined: "2024-01-15", status: "active" },
  { id: "u2", name: "فاطمة علي", email: "fatma@example.com", role: "seller", joined: "2024-03-22", status: "active" },
  { id: "u3", name: "سارة حسن", email: "sara@example.com", role: "user", joined: "2024-05-10", status: "active" },
  { id: "u4", name: "عمر خالد", email: "omar@example.com", role: "user", joined: "2024-06-01", status: "inactive" },
  { id: "u5", name: "نورا سعيد", email: "noura@example.com", role: "seller", joined: "2024-02-18", status: "active" },
  { id: "u6", name: "يوسف إبراهيم", email: "yousef@example.com", role: "user", joined: "2024-07-05", status: "active" },
]

export const sampleOrders: Order[] = [
  {
    id: "o1",
    userId: "u3",
    userName: "سارة حسن",
    products: [
      { productId: "p1", name: "سماعات لاسلكية", quantity: 1, price: 89.99 },
      { productId: "p3", name: "كوب قهوة سيراميك", quantity: 2, price: 18.50 },
    ],
    total: 126.99,
    status: "delivered",
    date: "2025-11-20",
  },
  {
    id: "o2",
    userId: "u6",
    userName: "يوسف إبراهيم",
    products: [
      { productId: "p4", name: "حذاء رياضي للجري", quantity: 1, price: 129.00 },
    ],
    total: 129.00,
    status: "shipped",
    date: "2025-12-01",
  },
  {
    id: "o3",
    userId: "u3",
    userName: "سارة حسن",
    products: [
      { productId: "p6", name: "ساعة ذكية", quantity: 1, price: 199.99 },
      { productId: "p8", name: "سجادة يوغا", quantity: 1, price: 49.99 },
    ],
    total: 249.98,
    status: "pending",
    date: "2025-12-15",
  },
]

export const categories = ["الكل", "إلكترونيات", "ملابس", "المنزل", "رياضة", "إكسسوارات"]

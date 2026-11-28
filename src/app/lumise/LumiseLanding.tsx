"use client";

/*
|--------------------------------------------------------------------------
| LUMISE — Premium Persian Landing Page (Light Theme)
|--------------------------------------------------------------------------
| Stack: Next.js App Router + Tailwind CSS + Framer Motion + Lucide React
| Install: npm install framer-motion lucide-react
| Font: Vazirmatn / IRANSansX (در layout تنظیم شود)
|
| - تم اصلی روشن با هاله‌های بنفش؛ چند سکشن تیره/گرادیانتی برای تنوع
| - بدون API و بدون درخواست تصویر خارجی؛ مناسب Static Prerender
| - انیمیشن‌ها فقط transform و opacity
| - محتوای FAQ همیشه در DOM است (قابل ایندکس)
|
| تصاویر: جایگاه‌ها خالی هستند؛ فایل‌ها را در /public/images/lumise/
| قرار دهید و با next/image و alt فارسی جایگزین کنید.
|--------------------------------------------------------------------------
*/

import type {LucideIcon} from "lucide-react";
import {
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  CreditCard,
  Crop,
  Crown,
  Database,
  Eye,
  FileDown,
  FileImage,
  FileJson,
  FileText,
  Gift,
  Globe2,
  Image as ImageIcon,
  Info,
  Languages,
  Layers3,
  LayoutDashboard,
  LayoutTemplate,
  Maximize2,
  Menu,
  MessagesSquare,
  Monitor,
  MousePointer2,
  Move,
  Package,
  Palette,
  Printer,
  QrCode,
  RefreshCw,
  Rocket,
  Scan,
  Shapes,
  Share2,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Truck,
  Type,
  Undo2,
  Upload,
  Users,
  WandSparkles,
  X
} from "lucide-react";

import type {ReactNode} from "react";
import {useEffect, useRef, useState} from "react";

import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

import {type DemoId, DEMOS, FAQS, URLS} from "./content";
import Image from "next/image";

// ---------------------------------------------------------------------------
// داده‌ها
// ---------------------------------------------------------------------------

const DEMO_ICONS: Record<DemoId, LucideIcon> = {
  editor: Palette,
  admin: LayoutDashboard,
  store: Store,
};

const trustStats = [
  {value: "4.79 / 5", label: "امتیاز از ۹۰۷ رأی", icon: Star},
  {value: "3K+", label: "کامنت و دیدگاه کاربران", icon: MessagesSquare},
  {value: "13,500+", label: "مشتری در بازار بین‌المللی", icon: Globe2},
  {value: "4,000+", label: "فایل هدیه و رایگان", icon: Gift},
  {value: "", label: "مطمئن و بدون کد مخرب امنیتی", icon: ShieldCheck},
  {value: "", label: "Power Elite Author", icon: Crown},
];

const screenshots = [
  {title: "محیط اصلی طراحی", subtitle: "Product Designer Interface", number: "01"},
  {title: "قالب‌های آماده طراحی", subtitle: "Pre-built Templates", number: "02"},
  {title: "کتابخانه تصاویر و Cliparts", subtitle: "Cliparts & Design Library", number: "03"},
  {title: "ویرایش تصویر و افکت‌ها", subtitle: "Image Editing & Effects", number: "04"},
  {title: "طراحی در موبایل و تبلت", subtitle: "Mobile & Tablet Editor", number: "05"},
  {title: "خروجی و فایل آماده چاپ", subtitle: "Print-ready Export", number: "06"},
];

const productTypes = [
  "تیشرت و پوشاک",
  "ماگ و لیوان",
  "کفش و کتانی",
  "قاب موبایل",
  "پوستر و تابلو",
  "استیکر و برچسب",
  "پیکسل و بج",
  "کارت ویزیت",
  "محصولات تبلیغاتی",
  "محصولات اختصاصی",
];

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  tag: string;
};

const featureGroups: {
  id: string;
  label: string;
  description: string;
  features: Feature[];
}[] = [
  {
    id: "designer",
    label: "هسته اصلی طراحی",
    description: "ابزارهایی که تجربه طراحی آنلاین مشتری را شکل می‌دهند.",
    features: [
      {
        icon: Palette,
        title: "ویرایشگر آنلاین حرفه‌ای",
        text: "محیط طراحی با رابط کاربری شبیه اپلیکیشن، مناسب برای شخصی‌سازی محصولات و اجرای ایده‌های مشتری.",
        tag: "Core Designer",
      },
      {
        icon: Eye,
        title: "پیش‌نمایش زنده محصول",
        text: "مشتری تغییرات طرح را در محیط طراحی مشاهده می‌کند و پیش از ثبت سفارش از نتیجه کار مطلع می‌شود.",
        tag: "Live Preview",
      },
      {
        icon: LayoutTemplate,
        title: "قالب‌های آماده طراحی",
        text: "قالب‌های از پیش طراحی‌شده را ایجاد کنید، به محصولات اختصاص دهید و امکان استفاده سریع از آن‌ها را فراهم کنید.",
        tag: "Pre-built Templates",
      },
      {
        icon: Shapes,
        title: "کتابخانه Clipart و المان‌های گرافیکی",
        text: "دسترسی به منابع گرافیکی و کتابخانه‌های متصل مانند Pixabay و Openclipart برای استفاده در طراحی‌ها.",
        tag: "Design Resources",
      },
      {
        icon: Type,
        title: "افکت‌های متنوع متن",
        text: "متن‌ها را با حالت‌هایی مانند منحنی، Oblique، Fisheye و افکت‌های محدب و مقعر شخصی‌سازی کنید.",
        tag: "Text Effects",
      },
      {
        icon: ImageIcon,
        title: "وارد کردن تصویر و طراحی اختصاصی",
        text: "مشتریان می‌توانند تصاویر و فایل‌های موردنظر خود را وارد محیط طراحی کنند و روی محصول قرار دهند.",
        tag: "Image Upload",
      },
    ],
  },
  {
    id: "editing",
    label: "ابزارهای ویرایش پیشرفته",
    description: "کنترل بیشتر روی عناصر، تصاویر و محدوده چاپ.",
    features: [
      {
        icon: Crop,
        title: "برش و ویرایش تصاویر",
        text: "تصاویر را برش دهید و با فیلترها، تغییر رنگ، افکت‌ها و امکانات ویرایش، آن‌ها را برای محصول آماده کنید.",
        tag: "Image Editing",
      },
      {
        icon: SlidersHorizontal,
        title: "فیلترها و افکت‌های تصویری",
        text: "تنظیم ظاهر تصویر با فیلترها و افکت‌های مختلف برای خلق طرح‌های متفاوت.",
        tag: "Image Filters",
      },
      {
        icon: Layers3,
        title: "Mask Layers",
        text: "استفاده از لایه‌های ماسک برای کنترل نحوه نمایش عناصر و طرح‌ها در محدوده‌های مشخص.",
        tag: "Mask Layers",
      },
      {
        icon: Scan,
        title: "Product Image Mask",
        text: "نمایش رنگ‌های متنوع یک محصول با استفاده از ماسک‌ها و لایه‌های تصویری؛ بدون نیاز به عکس مجزای هر رنگ.",
        tag: "Color Variations",
      },
      {
        icon: Move,
        title: "Auto Snap و تراز هوشمند",
        text: "هم‌تراز شدن عناصر با مرکز، خطوط راهنما، شبکه و سایر لایه‌ها هنگام جابه‌جایی.",
        tag: "Auto Snap",
      },
      {
        icon: Maximize2,
        title: "محدوده و ناحیه چاپ منعطف",
        text: "محدوده‌های قابل ویرایش و ناحیه چاپ هر محصول را با توجه به نیاز فروشگاه تعریف کنید.",
        tag: "Flexible Edit Zone",
      },
      {
        icon: QrCode,
        title: "افزودن QR Code",
        text: "امکان اضافه کردن کد QR به طرح‌ها برای شخصی‌سازی بیشتر محصولات.",
        tag: "QR Code",
      },
      {
        icon: Undo2,
        title: "Undo و Redo",
        text: "بازگردانی یا تکرار عملیات طراحی برای تجربه ویرایش راحت‌تر.",
        tag: "Editing History",
      },
    ],
  },
  {
    id: "business",
    label: "فروش، قیمت‌گذاری و سفارش",
    description: "اتصال فرایند طراحی به مدل تجاری و تولید فروشگاه.",
    features: [
      {
        icon: Calculator,
        title: "محاسبه قیمت چاپ",
        text: "قیمت‌گذاری طراحی‌ها بر اساس عواملی مانند متن، رنگ، Clipart و تنظیمات اختصاصی چاپ.",
        tag: "Printing Calculator",
      },
      {
        icon: Printer,
        title: "قیمت‌گذاری بر اساس تکنولوژی چاپ",
        text: "تعریف قیمت‌های اختصاصی برای DTG، چاپ سیلک، سابلیمیشن، Screen Printing، چاپ دیجیتال و گلدوزی.",
        tag: "Print Pricing",
      },
      {
        icon: ShoppingBag,
        title: "سبد خرید اختصاصی Lumise",
        text: "مشتری می‌تواند آیتم‌های طراحی‌شده خود را به سبد Lumise اضافه کند و قبل از پرداخت آن‌ها را ویرایش کند.",
        tag: "Custom Cart",
      },
      {
        icon: Package,
        title: "اختصاص قالب به محصول",
        text: "برای هر محصول یک قالب از پیش آماده تعریف کنید تا مشتری سریع‌تر طراحی را شروع کند.",
        tag: "Product Templates",
      },
      {
        icon: FileDown,
        title: "فایل آماده تولید پس از خرید",
        text: "فایل طراحی نهایی پس از تکمیل سفارش به اطلاعات سفارش متصل می‌شود تا برای فرایند تولید استفاده شود.",
        tag: "Production Workflow",
      },
      {
        icon: Database,
        title: "مدیریت محصولات و سفارش‌ها",
        text: "مدیریت محصولات، سفارش‌ها و گردش کار طراحی از طریق بخش مدیریتی Lumise.",
        tag: "Backend Management",
      },
    ],
  },
  {
    id: "workflow",
    label: "سازگاری و گردش کار",
    description: "امکاناتی برای استفاده آسان‌تر مشتریان و مدیریت فروشگاه.",
    features: [
      {
        icon: Smartphone,
        title: "پشتیبانی از موبایل و تبلت",
        text: "مشتریان می‌توانند با موبایل و تبلت نیز محصولات موردنظرشان را طراحی و سفارش‌گذاری کنند.",
        tag: "Responsive Designer",
      },
      {
        icon: FileImage,
        title: "خروجی چندفرمتی با کیفیت بالا",
        text: "خروجی‌های PDF، SVG، JSON و PNG برای استفاده در گردش کار تولید و چاپ.",
        tag: "Multi-format Export",
      },
      {
        icon: Languages,
        title: "پشتیبانی از چند زبان",
        text: "مدیریت و ترجمه متن‌های رابط کاربری از پنل مدیریت برای زبان‌های موردنیاز فروشگاه.",
        tag: "Multi-language",
      },
      {
        icon: Upload,
        title: "Import و Export طراحی",
        text: "ذخیره و انتقال طرح‌ها بین دستگاه‌ها، ادامه طراحی در زمان دیگر و ساخت قالب از طرح‌های ذخیره‌شده.",
        tag: "Design Transfer",
      },
      {
        icon: Share2,
        title: "دریافت تصاویر از شبکه‌های اجتماعی",
        text: "امکان استفاده از تصاویر موجود در حساب‌های اجتماعی مانند Facebook و Instagram در طراحی.",
        tag: "Social Media",
      },
      {
        icon: RefreshCw,
        title: "همگام‌سازی قالب‌ها با فروشگاه",
        text: "قابلیت Sync برای نگهداری و هماهنگ‌سازی قالب‌های آماده طراحی با فروشگاه.",
        tag: "Template Sync",
      },
    ],
  },
];

const addons = [
  {
    icon: Layers3,
    title: "Addons Bundle",
    desc: "مجموعه‌ای از ابزارهای تکمیلی برای تنظیم محصولات، پروژه‌های مشتریان و عملیات روزمره فروشگاه.",
    label: "بسته افزونه‌های مکمل",
  },
  {
    icon: Truck,
    title: "Printful Integration",
    desc: "اتصال محصولات و طرح‌ها به Printful برای گردش کار Print-on-Demand و همگام‌سازی سفارش‌ها.",
    label: "افزونه جداگانه",
  },
  {
    icon: Monitor,
    title: "Lumise MONO",
    desc: "افزونه ویرایشگر مدرن با ظاهر مینیمال‌تر، ساختار ساده‌تر و تجربه بهتر در موبایل.",
    label: "افزونه جداگانه",
  },
  {
    icon: ImageIcon,
    title: "Product Mask",
    desc: "مدیریت نمایش رنگ‌ها و حالت‌های مختلف محصول با استفاده از ماسک‌های تصویری.",
    label: "افزونه جداگانه",
  },
];

const printMethods = [
  "DTG",
  "Silk Printing",
  "Sublimation",
  "Screen Printing",
  "Digital Printing",
  "Embroidery",
];

const navLinks: [string, string][] = [
  ["ویژگی‌ها", "#features"],
  ["اسکرین‌شات‌ها", "#screenshots"],
  ["محصولات", "#products"],
  ["نحوه کار", "#how-it-works"],
  ["افزونه‌های مکمل", "#addons"],
  ["سؤالات متداول", "#faq"],
];

const prettyUrl = (href: string) =>
  href.replace(/^https?:\/\//, "").replace(/\/$/, "");

// ---------------------------------------------------------------------------
// انیمیشن ورود
// ---------------------------------------------------------------------------

function Reveal({
                  children,
                  delay = 0,
                  className = "",
                }: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : {opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.12}}
      transition={{duration: 0.7, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// عنوان سکشن (روشن / تیره)
// ---------------------------------------------------------------------------

function SectionHeading({
                          id,
                          eyebrow,
                          title,
                          description,
                          dark = false,
                        }: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
      <div
        dir="ltr"
        className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.14em] ${
          dark
            ? "border-violet-400/20 bg-violet-400/[0.08] text-violet-300"
            : "border-violet-200 bg-violet-50 text-violet-700"
        }`}
      >
        <Sparkles size={14}/>
        {eyebrow}
      </div>

      <h2
        id={id}
        className={`text-3xl font-black leading-[1.7] tracking-tight md:text-6xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mx-auto mt-5 max-w-3xl text-sm leading-9 md:text-base ${
          dark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

const Accent = ({children}: { children: ReactNode }) => (
  <span className="bg-gradient-to-l from-violet-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// دکمه‌ها
// ---------------------------------------------------------------------------

function PrimaryButton({
                         children,
                         href = URLS.purchase,
                       }: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{y: -3, scale: 1.02}}
      whileTap={{scale: 0.97}}
      className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-l from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-black text-white shadow-[0_14px_40px_-10px_rgba(124,58,237,0.6)] transition-shadow hover:shadow-[0_18px_50px_-8px_rgba(124,58,237,0.7)]"
    >
      {children}
      <ArrowLeft
        size={18}
        className="transition-transform group-hover:-translate-x-1"
      />
    </motion.a>
  );
}

function OutlineButton({
                         children,
                         href,
                         dark = false,
                         external = false,
                       }: {
  children: ReactNode;
  href: string;
  dark?: boolean;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{y: -3}}
      whileTap={{scale: 0.97}}
      className={`inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 text-sm font-bold backdrop-blur transition-colors ${
        dark
          ? "border-white/15 bg-white/[0.04] text-white hover:border-violet-300/50 hover:bg-violet-400/10"
          : "border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:border-violet-300 hover:text-violet-700"
      }`}
    >
      {children}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// هدر + زیرمنوی دموها
// ---------------------------------------------------------------------------

function DemoMenuItem({
                        demo,
                        onClick,
                      }: {
  demo: (typeof DEMOS)[number];
  onClick?: () => void;
}) {
  const Icon = DEMO_ICONS[demo.id];

  return (
    <a
      href={demo.href}
      target="_blank"
      rel="noopener noreferrer"
      role="menuitem"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-violet-50"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-600 transition-colors group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:text-white">
        <Icon size={20}/>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-slate-800">
          {demo.title}
        </span>
        <span
          dir="ltr"
          className="mt-1 block truncate text-right text-[10px] font-semibold text-slate-400"
        >
          {demo.label} · EN
        </span>
      </span>

      <ArrowUpLeft
        size={16}
        className="shrink-0 text-slate-300 transition-all group-hover:-translate-x-0.5 group-hover:text-violet-600"
      />
    </a>
  );
}

function DemoDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="demo-menu"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full px-4 py-3 text-xs font-bold transition-colors ${
          open
            ? "bg-violet-50 text-violet-700"
            : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
        }`}
      >
        <MousePointer2 size={15}/>
        دموی نسخه اصلی
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="demo-menu"
            role="menu"
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 8}}
            transition={{duration: 0.18}}
            className="absolute left-0 top-full z-50 w-[340px] pt-3"
          >
            <div
              className="rounded-[26px] border border-violet-100 bg-white p-2 shadow-[0_30px_70px_-20px_rgba(76,29,149,0.35)]">
              <div className="flex items-center justify-between px-3 pb-2 pt-3">
                <span className="text-[11px] font-black text-slate-500">
                  دموهای نسخه اصلی
                </span>
                <span
                  dir="ltr"
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-500"
                >
                  ENGLISH
                </span>
              </div>

              {DEMOS.map((demo) => (
                <DemoMenuItem
                  key={demo.id}
                  demo={demo}
                  onClick={() => setOpen(false)}
                />
              ))}

              <a
                href="#demos"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-2xl bg-violet-50/70 px-4 py-3 text-center text-[11px] font-bold text-violet-700 hover:bg-violet-100"
              >
                نسخه ما کاملاً فارسی و راست‌چین است — بیشتر بدانید
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100/70 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          dir="ltr"
          aria-label="Lumise — بازگشت به ابتدای صفحه"
          className="text-[24px] font-black tracking-[0.15em] text-slate-900"
        >
          LUMISE<span className="text-violet-600">.</span>
        </a>

        <nav aria-label="منوی اصلی" className="hidden items-center gap-6 xl:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs font-semibold text-slate-500 transition hover:text-violet-700"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <DemoDropdown/>

            <a
              href={URLS.purchase}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-black text-white transition hover:bg-violet-600"
            >
              خرید افزونه
              <ArrowUpLeft size={15}/>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 xl:hidden"
          >
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{height: 0, opacity: 0}}
            animate={{height: "auto", opacity: 1}}
            exit={{height: 0, opacity: 0}}
            className="overflow-hidden border-t border-violet-100 bg-white xl:hidden"
          >
            <nav aria-label="منوی موبایل" className="flex flex-col gap-1 px-5 py-5">
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                >
                  {label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => setDemosOpen((v) => !v)}
                aria-expanded={demosOpen}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-violet-50"
              >
                دموی نسخه اصلی (انگلیسی)
                <ChevronDown
                  size={18}
                  className={`transition-transform ${demosOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {demosOpen && (
                  <motion.div
                    role="menu"
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    className="overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/40 p-1"
                  >
                    {DEMOS.map((demo) => (
                      <DemoMenuItem
                        key={demo.id}
                        demo={demo}
                        onClick={() => setMenuOpen(false)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href={URLS.purchase}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-xl bg-gradient-to-l from-violet-600 to-fuchsia-600 p-4 text-center text-sm font-black text-white"
              >
                خرید افزونه Lumise
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------------------------------------------------------------------------
// آمار اعتماد — متنی، بدون کادر، چرخشی
// ---------------------------------------------------------------------------

function TrustTicker() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % trustStats.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [paused]);

  const item = trustStats[active];
  const Icon = item.icon;

  return (
    <div
      className="flex flex-col items-center gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        dir="ltr"
        className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-emerald-600"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/>
        </span>
        TRUSTED WORLDWIDE
      </div>

      <div className="relative h-8 w-full overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.28}}
            className="flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
          >
            <Icon size={18} className="shrink-0 text-violet-600"/>
            <strong dir="ltr" className="font-black text-slate-900">
              {item.value}
            </strong>
            <span className="text-slate-500">{item.label}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5">
        {trustStats.map((stat, index) => (
          <button
            key={"trustStats" + index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={stat.label}
            aria-current={active === index}
            className={`h-1.5 rounded-full transition-all ${
              active === index ? "w-5 bg-violet-600" : "w-1.5 bg-violet-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-76px)] scroll-mt-20 items-center justify-center overflow-hidden bg-white px-5 pb-24 pt-12 md:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-grid"/>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-violet-400/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-[35%] h-[380px] w-[380px] rounded-full bg-fuchsia-300/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-32 h-[420px] w-[420px] rounded-full bg-indigo-300/25 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <Reveal>
          <div
            dir="ltr"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-5 py-2.5 text-[10px] font-black tracking-[0.16em] text-violet-700 shadow-sm backdrop-blur sm:text-xs"
          >
            <Sparkles size={15}/>
            THE PRODUCT PERSONALIZATION EXPERIENCE
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            aria-hidden="true"
            dir="ltr"
            className="hero-wordmark select-none text-[clamp(3.6rem,13vw,10.5rem)] font-black leading-[1.05] tracking-[0.28em] mt-7"
          >
            LUMISE
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <h1 id="hero-title" className="mx-auto mt-3 max-w-3xl">
            <span className="block text-sm font-bold text-violet-700 sm:text-base">
              لومیس؛ افزونه حرفه‌ای طراحی و شخصی‌سازی آنلاین محصول برای ووکامرس
            </span>
            <span className="mt-4 block text-3xl font-black leading-[1.7] text-slate-900 sm:text-4xl md:text-5xl">
              متشری های <Accent>خاص</Accent> رو از دست نده!
            </span>
          </h1>

          {/*<p className="mx-auto mt-6 max-w-2xl text-sm leading-9 text-slate-600 sm:text-base md:text-lg">
            فروشگاه ووکامرس خود را به یک استودیوی طراحی آنلاین تبدیل کنید؛
            مشتری محصول را شخصی‌سازی می‌کند، نتیجه را زنده می‌بیند و طرح
            نهایی با فایل آماده چاپ به سفارش متصل می‌شود.
          </p>*/}
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-600 justify-center"
                 style={{minWidth: '250px'}}>
              <Star size={15} fill="currentColor"/>
              <span dir="ltr" className="mt-2">#1 Best Selling 2020</span>
            </div>


            <span className="hidden h-4 w-px bg-slate-200 sm:block"/>

            <span className="w-full max-w-[250px] mt-2 ">
              <TrustTicker/>
            </span>

            <span className="hidden h-4 w-px bg-slate-200 sm:block"/>

            <div className="flex items-center gap-2 text-slate-500  justify-center" style={{minWidth: '250px'}}>
              <span className="flex gap-0.5 text-amber-400">
                {Array.from({length: 5}).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor"/>
                ))}
              </span>
              <strong dir="ltr" className="font-black mt-1 text-slate-800">
                4.79 / 5
              </strong>
              <span className="mt-1">امتیاز CodeCanyon</span>
            </div>
          </div>
        </Reveal>


        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PrimaryButton>خرید نسخه فارسی لومیس</PrimaryButton>

            <OutlineButton href="#demos">
              <div className="flex px-7 justify-center items-center gap-2 ">
                <MousePointer2 size={17}/>
                مشاهده دموها
              </div>
            </OutlineButton>
          </div>
        </Reveal>

        <Reveal delay={0.48}>
          <a
            href="#demos"
            className="mt-14 inline-flex flex-col items-center gap-3 text-slate-400 hover:text-violet-600"
          >
            <span dir="ltr" className="text-[9px] font-black tracking-[0.25em]">
              EXPLORE LUMISE
            </span>
            <motion.span
              animate={{y: [0, 7, 0]}}
              transition={{duration: 1.8, repeat: Infinity}}
            >
              <ChevronDown size={20}/>
            </motion.span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// معرفی دموهای نسخه اصلی
// ---------------------------------------------------------------------------

function DemosSection() {
  return (
    <section
      id="demos"
      aria-labelledby="demos-title"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-violet-50/60 via-white to-white py-14 md:py-16"
    >
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        <SectionHeading
          id="demos-title"
          eyebrow="ORIGINAL VERSION DEMOS"
          title={
            <>
              دموی <Accent>نسخه اصلی</Accent> را ببینید
            </>
          }
          description="دموهای زیر مربوط به نسخه اصلی و انگلیسی افزونه لومیس هستند. شما می‌توانید به‌راحتی وارد این دموها شوید و پیش از خرید، با محیط کلی، امکانات و تجربه کاربری افزونه آشنا شوید."
        />

        {/* Compact notice */}
        <div
          className="mx-auto mt-5 mb-7 flex max-w-3xl items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
          <Info
            size={19}
            className="mt-0.5 shrink-0 text-violet-600"
          />

          <p className="text-xs leading-7 text-slate-600 sm:text-sm">
            <strong className="text-violet-900">توجه:</strong>{" "}
            دموها انگلیسی هستند؛ اما نسخه ارائه‌شده به شما کاملاً
            <span className="font-bold text-violet-700">
          {" "}فارسی، راست‌چین و با فونت فارسی
        </span>
            {" "}خواهد بود.
          </p>
        </div>

        {/* Demo cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {DEMOS.map((demo, i) => {
            const Icon = DEMO_ICONS[demo.id];

            return (
              <Reveal key={demo.id} delay={i * 0.06}>
                <motion.a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{y: -4}}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60"
                >
                  {/* Browser bar */}
                  <div
                    dir="ltr"
                    className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-3 py-2"
                  >
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-300"/>
                  <span className="h-2 w-2 rounded-full bg-amber-300"/>
                  <span className="h-2 w-2 rounded-full bg-emerald-300"/>
                </span>

                    <span className="truncate rounded-md bg-white px-2 py-1 text-[10px] text-slate-400">
                  {prettyUrl(demo.href)}
                </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <Icon size={22}/>
                  </span>

                      <span
                        dir="ltr"
                        className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-bold tracking-wider text-slate-500"
                      >
                    ORIGINAL · EN
                  </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      {demo.title}
                    </h3>

                    <p
                      dir="ltr"
                      className="mt-1 text-right text-[10px] font-semibold text-violet-500"
                    >
                      {demo.label}
                    </p>

                    <p className="mt-3 flex-1 text-xs leading-7 text-slate-500">
                      {demo.description}
                    </p>

                    <div
                      className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-extrabold text-violet-700">
                      مشاهده دمو آنلاین
                      <ArrowUpLeft
                        size={15}
                        className="transition-transform group-hover:-translate-x-1"
                      />
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>);
}

// ---------------------------------------------------------------------------
// نوار ویژگی‌های سریع
// ---------------------------------------------------------------------------

function QuickHighlights() {
  const items = [
    {icon: Palette, title: "طراحی آنلاین"},
    {icon: Printer, title: "فایل آماده چاپ"},
    {icon: Smartphone, title: "سازگار با موبایل"},
    {icon: ShoppingBag, title: "اتصال به ووکامرس"},
  ];

  return (
    <section aria-label="امکانات کلیدی" className="border-y border-violet-100 bg-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 py-8 md:grid-cols-4 lg:px-8">
        {items.map(({icon: Icon, title}, i) => (
          <li key={title}>
            <Reveal delay={i * 0.07}>
              <div className="flex items-center justify-center gap-3 py-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-600">
                  <Icon size={20}/>
                </div>
                <span className="text-xs font-bold text-slate-700 sm:text-sm">
                  {title}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// اسکرین‌شات‌ها
// ---------------------------------------------------------------------------

function ScreenshotSection() {
  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-title"
      className="scroll-mt-24 bg-white py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="screenshots-title"
          eyebrow="INSIDE THE DESIGNER"
          title={
            <>
              نگاهی نزدیک به <Accent>محیط Lumise</Accent>
            </>
          }
          description="رابط طراحی، ابزارهای ویرایش و امکاناتی که مشتریان در مسیر ساخت محصول اختصاصی با آن کار می‌کنند."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((shot, i) => (
            <Reveal key={shot.number} delay={i * 0.07}>
              <motion.figure
                whileHover={{y: -7}}
                className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-3 shadow-[0_20px_50px_-35px_rgba(76,29,149,0.4)] transition-colors hover:border-violet-200"
              >
                {/* جایگاه تصویر — با next/image و alt مناسب جایگزین شود */}
                <div
                  className="relative flex aspect-[1.42/1] items-center justify-center overflow-hidden rounded-[19px] border border-dashed border-violet-200 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.12),transparent_65%)] bg-violet-50/40">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm">
                      <ImageIcon size={22}/>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">
                      محل قرارگیری اسکرین‌شات
                    </p>
                    <p dir="ltr" className="mt-2 text-[9px] tracking-widest text-slate-300">
                      lumise-{shot.number}.webp
                    </p>
                  </div>

                  <span
                    dir="ltr"
                    className="absolute left-4 top-4 text-[10px] font-black text-violet-400"
                  >
                    {shot.number}
                  </span>
                </div>

                <figcaption className="flex items-center justify-between gap-3 px-3 py-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {shot.title}
                    </h3>
                    <p dir="ltr" className="mt-2 text-right text-[9px] tracking-wider text-slate-400">
                      {shot.subtitle}
                    </p>
                  </div>
                  <ArrowUpLeft
                    size={18}
                    className="shrink-0 text-slate-300 transition-all group-hover:-translate-x-1 group-hover:text-violet-600"
                  />
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// انواع محصولات
// ---------------------------------------------------------------------------

function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#F6F3FF] to-white py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="products-title"
          eyebrow="CREATE WITHOUT LIMITS"
          title={
            <>
              از یک تیشرت ساده تا <Accent>هر ایده‌ای</Accent>
            </>
          }
          description="برای هر محصول قابل چاپ، یک تجربه طراحی اختصاصی بسازید. مشتریان شما می‌توانند محصول موردنظرشان را با سلیقه خود شخصی‌سازی کنند."
        />

        <Reveal>
          <div
            className="relative mb-10 flex min-h-[300px] items-center justify-center overflow-hidden rounded-[32px] border border-violet-100 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.25),rgba(255,255,255,0.6)_55%,transparent_80%)] bg-white md:min-h-[410px]">
            <div aria-hidden
                 className="absolute h-[260px] w-[260px] rounded-full border border-violet-200/70 md:h-[350px] md:w-[350px]"/>
            <div aria-hidden
                 className="absolute h-[210px] w-[210px] rounded-full border border-dashed border-violet-300/60 md:h-[290px] md:w-[290px]"/>

            <Image
              src="/lumise/img/landing/Floating Purple Merchandise Orbit.png"
              alt="افزونه طراح سفارشی محصول برای ووکامرس وردپرس | لومیس"
              fill
              className="object-contain"
            />
          </div>
        </Reveal>

        <ul className="flex flex-wrap justify-center gap-3">
          {productTypes.map((item, i) => (
            <li key={item}>
              <Reveal delay={i * 0.025}>
                <motion.span
                  whileHover={{y: -5, scale: 1.06}}
                  whileTap={{scale: 0.96}}
                  className="
            block cursor-pointer rounded-full
            bg-violet-100 from-violet-50 via-purple-50 to-fuchsia-100
            px-5 py-3
            text-xs font-bold tracking-wide text-violet-700
            shadow-[0_4px_15px_rgba(139,92,246,0.10)]
            transition-all duration-300 ease-out
            hover:shadow-[0_8px_25px_rgba(139,92,246,0.30)]
          "
                >
                  {item}
                </motion.span>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-[11px] leading-7 text-slate-400">
          نوع محصولات نهایی به محصولاتی بستگی دارد که در فروشگاه تعریف می‌کنید و برای آن‌ها ناحیه چاپ تنظیم می‌شود.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ویژگی‌ها
// ---------------------------------------------------------------------------

function FeatureCard({item, index}: { item: Feature; index: number }) {
  const Icon = item.icon;

  return (
    <Reveal delay={(index % 3) * 0.05}>
      <motion.article
        whileHover={{y: -5}}
        className="group h-full rounded-[23px] border border-slate-200/80 bg-white p-6 transition-all hover:border-violet-200 hover:shadow-[0_25px_60px_-30px_rgba(124,58,237,0.45)]"
      >
        <div className="mb-6 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-600 transition-all group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:text-white">
            <Icon size={23} strokeWidth={1.8}/>
          </div>
          <span dir="ltr"
                className="rounded-full bg-slate-100 px-3 py-1.5 text-[8px] font-bold tracking-wider text-slate-500">
            {item.tag}
          </span>
        </div>

        <h4 className="mb-3 text-base font-black text-slate-900">{item.title}</h4>
        <p className="text-xs leading-8 text-slate-500">{item.text}</p>

        <div
          className="mt-5 h-px w-0 bg-gradient-to-l from-violet-500 to-transparent transition-all duration-500 group-hover:w-full"/>
      </motion.article>
    </Reveal>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-24 bg-white py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="features-title"
          eyebrow="A COMPLETE DESIGN TOOLKIT"
          title={
            <>
              تمام ابزارهای لازم، <Accent>در یک تجربه</Accent>
            </>
          }
          description="از طراحی اولیه و ویرایش تصاویر تا قیمت‌گذاری چاپ و اتصال به سفارش؛ امکانات Lumise بر اساس مسیر واقعی کاربر دسته‌بندی شده‌اند."
        />

        <div className="space-y-20">
          {featureGroups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal>
                <div
                  className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="h-px w-8 bg-violet-500"/>
                      <span dir="ltr" className="text-[10px] font-black tracking-[0.16em] text-violet-600">
                        GROUP 0{groupIndex + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 md:text-2xl">
                      {group.label}
                    </h3>
                  </div>
                  <p className="max-w-xl text-xs leading-7 text-slate-500">
                    {group.description}
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.features.map((item, i) => (
                  <FeatureCard key={item.title} item={item} index={i}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[11px] leading-7 text-slate-400">
          این فهرست بر اساس امکانات معرفی‌شده در صفحه محصول CodeCanyon و سایت رسمی Lumise تهیه شده است. برخی قابلیت‌ها
          ممکن است به نسخه، تنظیمات یا افزونه مکمل وابسته باشند.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// چاپ و خروجی — سکشن تیره
// ---------------------------------------------------------------------------

function PrintSection() {
  const formats = [
    {icon: FileText, label: "PDF"},
    {icon: Code2, label: "SVG"},
    {icon: FileJson, label: "JSON"},
    {icon: FileImage, label: "PNG"},
  ];

  return (
    <section
      aria-labelledby="print-title"
      className="relative overflow-hidden bg-[#0B0816] py-28 md:py-32"
    >
      <div aria-hidden
           className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]"/>
      <div aria-hidden
           className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[140px]"/>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div
            className="relative flex min-h-[370px] items-center justify-center overflow-hidden rounded-[32px] border border-violet-300/15 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]">
            <div aria-hidden className="absolute inset-8 rounded-[25px] border border-dashed border-violet-300/15"/>

            <div className="relative grid grid-cols-2 gap-4">
              {formats.map(({icon: Icon, label}, i) => (
                <motion.div
                  key={label}
                  animate={{y: [0, i % 2 === 0 ? -7 : 7, 0]}}
                  transition={{duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut"}}
                  className="flex h-24 w-28 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#17122A] text-violet-300 shadow-xl"
                >
                  <Icon size={27}/>
                  <span dir="ltr" className="text-xs font-black text-white">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div
              dir="ltr"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-4 py-2 text-[10px] font-black text-emerald-300"
            >
              <Printer size={14}/>
              PRINT-READY WORKFLOW
            </div>

            <h2 id="print-title" className="text-3xl font-black leading-[1.8] text-white md:text-4xl">
              طراحی فقط شروع کار است.
              <br/>
              <span className="text-violet-300">آماده‌سازی برای تولید، مرحله بعدی است.</span>
            </h2>

            <p className="mt-6 text-sm leading-9 text-slate-400">
              پس از نهایی شدن سفارش، فایل طراحی به اطلاعات سفارش متصل می‌شود.
              Lumise از چند فرمت خروجی برای گردش کار چاپ پشتیبانی می‌کند و
              امکاناتی برای تنظیم قیمت تکنولوژی‌های مختلف چاپ ارائه می‌دهد.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {printMethods.map((method) => (
                <li
                  key={method}
                  dir="ltr"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-bold text-slate-300"
                >
                  {method}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="mt-8 flex items-center gap-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] p-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
                <CheckCircle2 size={25}/>
              </div>
              <div>
                <h3 className="text-sm font-black text-white">خروجی با کیفیت بالا و 300 DPI</h3>
                <p className="mt-2 text-[11px] leading-6 text-slate-400">
                  مناسب برای آماده‌سازی طرح در فرایند تولید و چاپ
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// نحوه کار
// ---------------------------------------------------------------------------

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: ShoppingBag,
      title: "انتخاب محصول",
      text: "مشتری محصول موردنظر را در فروشگاه انتخاب می‌کند و وارد محیط طراحی می‌شود."
    },
    {
      number: "02",
      icon: WandSparkles,
      title: "شخصی‌سازی آنلاین",
      text: "متن، تصویر، رنگ و المان‌های گرافیکی را اضافه می‌کند و تغییرات را می‌بیند."
    },
    {
      number: "03",
      icon: CreditCard,
      title: "ثبت سفارش",
      text: "طرح نهایی را تأیید می‌کند و فرایند خرید را از طریق فروشگاه انجام می‌دهد."
    },
    {
      number: "04",
      icon: Printer,
      title: "آماده‌سازی برای تولید",
      text: "فایل طراحی به سفارش متصل می‌شود تا برای مراحل تولید و چاپ استفاده شود."
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-24 bg-gradient-to-b from-white to-[#F6F3FF] py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="how-title"
          eyebrow="HOW IT WORKS"
          title={
            <>
              از ایده تا محصول، <Accent>در چهار قدم</Accent>
            </>
          }
          description="یک مسیر یکپارچه برای مشتری بسازید؛ از انتخاب محصول و طراحی گرفته تا ثبت سفارش و آماده‌سازی فایل نهایی."
        />

        <div className="relative">
          <div
            aria-hidden
            className="absolute right-[12%] top-12 hidden h-px w-[76%] bg-gradient-to-l from-violet-200 via-violet-400 to-violet-200 lg:block"
          />

          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <li key={step.number}>
                  <Reveal delay={i * 0.1}>
                    <div className="relative text-center">
                      <div
                        className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-100 bg-white text-violet-600 shadow-[0_20px_50px_-20px_rgba(124,58,237,0.45)]">
                        <Icon size={31}/>
                        <span
                          dir="ltr"
                          className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[10px] font-black text-white"
                        >
                        {step.number}
                      </span>
                      </div>
                      <h3 className="mb-4 text-base font-black text-slate-900">{step.title}</h3>
                      <p className="mx-auto max-w-xs text-xs leading-8 text-slate-500">{step.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// افزونه‌های مکمل
// ---------------------------------------------------------------------------

function AddonsSection() {
  return (
    <section
      id="addons"
      aria-labelledby="addons-title"
      className="scroll-mt-24 bg-white py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="addons-title"
          eyebrow="EXTEND YOUR WORKFLOW"
          title={
            <>
              امکانات بیشتر، <Accent>با افزونه‌های مکمل</Accent>
            </>
          }
          description="اکوسیستم Lumise شامل افزونه‌هایی است که امکانات فروشگاه و فرایند طراحی را گسترش می‌دهند."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {addons.map((addon, i) => {
            const Icon = addon.icon;

            return (
              <Reveal key={addon.title} delay={i * 0.08}>
                <motion.article
                  whileHover={{y: -5}}
                  className="flex h-full gap-5 rounded-[25px] border border-slate-200/80 bg-gradient-to-br from-white to-violet-50/50 p-6 transition-colors hover:border-violet-200"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-[0_12px_30px_-12px_rgba(124,58,237,0.5)]">
                    <Icon size={25}/>
                  </div>
                  <div>
                    <span
                      className="mb-3 inline-flex rounded-full bg-violet-100/70 px-3 py-1 text-[10px] font-bold text-violet-700">
                      {addon.label}
                    </span>
                    <h3 dir="ltr" className="text-right text-base font-black text-slate-900">{addon.title}</h3>
                    <p className="mt-3 text-xs leading-8 text-slate-500">{addon.desc}</p>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[11px] leading-7 text-slate-400">
          افزونه‌های مکمل، بسته به محصول و لایسنس انتخابی، ممکن است نیازمند خرید جداگانه باشند.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// آمار و اعتبار — کارت گرادیانتی تیره
// ---------------------------------------------------------------------------

function TrustSection() {
  const numbers = [
    {number: "+13,000", label: "فروش در CodeCanyon"},
    {number: "4.79", label: "امتیاز محصول از ۵"},
    {number: "907", label: "رأی ثبت‌شده"},
    {number: "+3,000", label: "کامنت و دیدگاه"},
  ];

  return (
    <section aria-labelledby="trust-title" className="relative overflow-hidden bg-violet-500 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#2B1959] via-[#1A1038] to-[#100B25] px-6 py-14 shadow-[0_35px_100px_-35px_rgba(76,29,149,0.55)] md:px-14 md:py-16">

            {/* Background decorations */}
            <div aria-hidden
                 className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-violet-500/20 blur-[110px]"/>
            <div aria-hidden
                 className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[110px]"/>
            <div aria-hidden
                 className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"/>

            <div className="relative">
              {/* Header */}
              <div className="mb-14 text-center">
                <div
                  dir="ltr"
                  className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-5 py-2.5 text-[10px] font-black tracking-[1.5px] text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.07)]"
                >
                  <ShieldCheck size={16}/>
                  TRUSTED WORLDWIDE
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]"/>
                </div>

                <h2
                  id="trust-title"
                  className="text-2xl font-black leading-[1.8] text-white md:text-4xl"
                >
                  اعتماد جهانی، با اعداد واقعی
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-xs leading-8 text-violet-200/60 md:text-sm">
                  نگاهی به آمار و عملکرد افزونه لومیس در بازار جهانی
                </p>

                <div
                  className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300"/>
              </div>

              {/* Statistics */}
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                {numbers.map((item, index) => {
                  const icons = [Users, ShoppingBag, Star, TrendingUp];
                  const Icon = icons[index % icons.length];

                  return (
                    <div
                      key={item.label}
                      className="group relative flex flex-col items-center overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.045] px-3 py-7 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-violet-300/30 hover:bg-white/[0.09] hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.3)] md:px-5 md:py-9"
                    >
                      {/* Card glow */}
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-all duration-300 group-hover:bg-violet-400/25"/>

                      <div
                        className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/10 text-violet-200 transition-all duration-300 group-hover:scale-110 group-hover:border-violet-300/40 group-hover:text-white">
                        <Icon size={22} strokeWidth={1.8}/>
                      </div>

                      <dd dir="ltr" className="text-3xl font-black tracking-tight text-white md:text-4xl">
                        {item.number}
                      </dd>

                      <dt className="mt-3 text-[10px] font-bold leading-6 text-violet-200/70 md:text-xs">
                        {item.label}
                      </dt>

                      <div
                        className="mt-5 h-px w-10 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent transition-all duration-300 group-hover:w-16"/>
                    </div>
                  );
                })}
              </dl>

              {/* Footer */}
              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/[0.08] pt-7 text-center">
                <div className="flex items-center gap-2 text-[10px] font-medium text-violet-200/50">
                  <ShieldCheck size={14} className="text-emerald-300"/>
                  اطلاعات ثبت‌شده در صفحه محصول Lumise
                </div>
                <span className="hidden h-1 w-1 rounded-full bg-violet-400/40 md:block"/>
                <div className="flex items-center gap-2 text-[10px] font-medium text-violet-200/50">
                  <Globe2 size={14} className="text-violet-300"/>
                  CodeCanyon Marketplace
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// نظرات
// ---------------------------------------------------------------------------

function ReviewsSection() {
  const reviews = [
    {
      name: "mygiftstory",
      title: "توجه به تجربه کاربری",
      text: "این محصول به‌خوبی طراحی شده و بسیاری از نیازهای من را پوشش داده است. پشتیبانی نیز پاسخ‌گو و مفید بوده است."
    },
    {
      name: "Terrance007",
      title: "پشتیبانی سریع",
      text: "پشتیبانی بسیار دوستانه است و در حل مشکلات و راهنمایی جزئیات، تجربه خوبی برای من ایجاد کرده است."
    },
    {
      name: "freecee",
      title: "رابط کاربری ساده",
      text: "رابط کاربری واضح و ساختار استفاده از محصول برای من ساده و کاربردی بوده است."
    },
  ];

  return (
    <section aria-labelledby="reviews-title" className="bg-white py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="reviews-title"
          eyebrow="CUSTOMER FEEDBACK"
          title={
            <>
              تجربه کاربران، <Accent>فراتر از تبلیغات</Accent>
            </>
          }
          description="چند نمونه از دیدگاه‌های ثبت‌شده کاربران در صفحه محصول (ترجمه آزاد)."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08}>
              <figure
                className="h-full rounded-[25px] border border-slate-200/80 bg-gradient-to-b from-white to-violet-50/40 p-7">
                <div className="mb-6 flex gap-1 text-amber-400" aria-label="۵ ستاره">
                  {Array.from({length: 5}).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor"/>
                  ))}
                </div>
                <h3 className="text-base font-black text-slate-900">{review.title}</h3>
                <blockquote className="mt-4 min-h-[115px] text-xs leading-8 text-slate-600">
                  «{review.text}»
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-200/80 pt-5">
                  <p dir="ltr" className="text-right text-xs font-black text-violet-700">{review.name}</p>
                  <p className="mt-2 text-[10px] text-slate-400">خریدار در بازار CodeCanyon</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href={URLS.purchase}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 transition hover:text-fuchsia-600"
          >
            مشاهده دیدگاه‌های بیشتر
            <ArrowUpLeft size={15}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// سؤالات متداول — پاسخ‌ها همیشه در DOM (قابل ایندکس)
// ---------------------------------------------------------------------------

function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-gradient-to-b from-[#F6F3FF] to-white py-28 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          id="faq-title"
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title={
            <>
              قبل از شروع، <Accent>پاسخ سؤالاتتان</Accent>
            </>
          }
          description="پاسخ چند سؤال کاربردی درباره امکانات، نسخه فارسی، سازگاری و نحوه خرید Lumise."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = active === i;

            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-[20px] border transition-all ${
                    isOpen
                      ? "border-violet-200 bg-white shadow-[0_20px_50px_-30px_rgba(124,58,237,0.45)]"
                      : "border-slate-200/80 bg-white/70"
                  }`}
                >
                  <h3>
                    <button
                      id={`faq-q-${i}`}
                      type="button"
                      onClick={() => setActive(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-right md:p-6"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100/70 text-violet-600">
                          <CircleHelp size={18}/>
                        </span>
                        <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                      </span>
                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-violet-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pr-[68px] text-xs leading-8 text-slate-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA نهایی — گرادیانت تیره
// ---------------------------------------------------------------------------

function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-white px-5 pb-24 pt-4">
      <Reveal>
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[35px] bg-gradient-to-br from-[#3B1A7A] via-[#1E1240] to-[#0F0B22] px-6 py-20 text-center shadow-[0_40px_100px_-40px_rgba(91,33,182,0.8)] md:px-14">
          <div aria-hidden
               className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-[100px]"/>
          <div aria-hidden
               className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-violet-500/30 blur-[100px]"/>

          <div className="relative">
            <div
              className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-[22px] border border-violet-300/20 bg-violet-300/10 text-violet-200">
              <Rocket size={30}/>
            </div>

            <p dir="ltr" className="mb-5 text-[10px] font-black tracking-[0.25em] text-violet-300">
              START CREATING
            </p>

            <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl font-black leading-[1.8] text-white md:text-5xl">
              به مشتریانتان اجازه دهید
              <span className="text-violet-300"> متفاوت خلق کنند.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-9 text-slate-300">
              تجربه طراحی آنلاین را به فروشگاه خود اضافه کنید و مسیر سفارش
              محصولات شخصی‌سازی‌شده را برای مشتریان ساده‌تر کنید.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryButton>خرید از راست چین</PrimaryButton>
              <OutlineButton href="#demos" dark>
                <MousePointer2 size={17}/>
                مشاهده دموها
              </OutlineButton>
            </div>

            <p className="mt-7 text-[10px] text-slate-400">
              جزئیات قیمت، لایسنس و شرایط خرید در صفحه رسمی CodeCanyon
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ---------------------------------------------------------------------------
// فوتر
// ---------------------------------------------------------------------------

function Footer() {
  const groups: { title: string; links: [string, string][] }[] = [
    {
      title: "بخش‌های صفحه",
      links: [
        ["دموها", "#demos"],
        ["ویژگی‌ها", "#features"],
        ["محصولات", "#products"],
        ["نحوه کار", "#how-it-works"],
        ["سؤالات متداول", "#faq"],
      ],
    },
    {
      title: "دموهای نسخه اصلی",
      links: DEMOS.map((d) => [d.title, d.href] as [string, string]),
    },
    {
      title: "لینک‌های رسمی",
      links: [
        ["وب‌سایت Lumise", URLS.official],
        ["خرید در CodeCanyon", URLS.purchase],
        ["مستندات", URLS.documentation],
      ],
    },
  ];

  return (
    <footer className="bg-[#0B0816] pt-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" dir="ltr" className="text-3xl font-black tracking-[0.15em] text-white">
              LUMISE<span className="text-violet-400">.</span>
            </a>
            <p className="mt-6 max-w-sm text-xs leading-8 text-slate-400">
              راهکار طراحی و شخصی‌سازی آنلاین محصولات برای فروشگاه‌های
              WordPress و WooCommerce؛ به‌صورت کامل فارسی و راست‌چین.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold text-emerald-300">
              <ShieldCheck size={16}/>
              اطلاعات محصول از منابع رسمی
            </div>
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="mb-6 text-sm font-black text-white">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map(([label, href]) => {
                  const external = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-xs text-slate-400 transition hover:text-violet-300"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 md:flex-row">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} LUMISE Landing Page
          </p>
          <a href="#home" className="flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">
            بازگشت به بالا
            <ArrowUpRight size={15}/>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// صفحه
// ---------------------------------------------------------------------------

export default function LumiseLanding() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="min-h-screen overflow-x-clip bg-white text-slate-900 selection:bg-violet-200 selection:text-violet-900"
    >
      <Header/>

      <main id="main">
        <Hero/>
        <DemosSection/>
        <QuickHighlights/>
        {/*<ScreenshotSection/>*/}
        <ProductsSection/>
        <FeaturesSection/>
        <PrintSection/>
        <HowItWorks/>
        <AddonsSection/>
        <TrustSection/>
        <ReviewsSection/>
        <FAQSection/>
        <FinalCTA/>
      </main>

      <Footer/>

      <style jsx global>{`
          html {
              scroll-behavior: smooth;
              scroll-padding-top: 86px;
              background: #ffffff;
          }

          body {
              margin: 0;
              background: #ffffff;
          }

          .hero-grid {
              background-image: linear-gradient(rgba(124, 58, 237, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.06) 1px, transparent 1px);
              background-size: 64px 64px;
              mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%);
              -webkit-mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%);
          }

          .hero-wordmark {
              background: linear-gradient(110deg, #1e1b4b 10%, #6d28d9 35%, #c026d3 55%, #7c3aed 75%, #1e1b4b 92%);
              background-size: 220% auto;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: lumise-text-shine 8s linear infinite;
              filter: drop-shadow(0 18px 40px rgba(124, 58, 237, 0.18));
          }

          @keyframes lumise-text-shine {
              to {
                  background-position: 220% center;
              }
          }

          @media (prefers-reduced-motion: reduce) {
              html {
                  scroll-behavior: auto;
              }

              *,
              *::before,
              *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
              }
          }
      `}</style>
    </div>
  );
}

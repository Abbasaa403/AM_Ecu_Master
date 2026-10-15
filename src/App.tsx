import { FormEvent, ReactNode, useMemo, useState } from "react";

type Page = "dashboard" | "dtc" | "vehicles" | "repairs" | "learn" | "customers";
type IconName =
  | "grid" | "scan" | "car" | "wrench" | "book" | "users" | "bell" | "search"
  | "plus" | "arrow" | "trend" | "clock" | "check" | "warning" | "menu"
  | "close" | "chevron" | "phone" | "mail" | "more" | "calendar" | "filter"
  | "headset" | "play" | "file" | "speed" | "user" | "location" | "download";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 12h8M12 8v8"/></>,
  car: <><path d="m5 11 1.5-4.2A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.8L19 11"/><path d="M3 12a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5H3z"/><path d="M5 17v2M19 17v2M7 14h.01M17 14h.01"/></>,
  wrench: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l7 7a2 2 0 0 1-2.8 2.8l-7-7"/><path d="m4 20 5-5"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  arrow: <path d="m9 18 6-6-6-6"/>,
  trend: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  warning: <><path d="m12 3 10 18H2z"/><path d="M12 9v4M12 17h.01"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  filter: <path d="M4 5h16l-6 7v5l-4 2v-7z"/>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19c0 1-1 2-2 2h-4M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z"/></>,
  play: <path d="m9 7 8 5-8 5z"/>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></>,
  speed: <><path d="M4 18a9 9 0 1 1 16 0"/><path d="m12 14 4-4M7 18h10"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2"/></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
};

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3">
    <img src="/am-ecu-master-logo.png" alt="لوگوی AM ECU MASTER" className="size-12 shrink-0 rounded-xl object-cover shadow-lg shadow-red-950/20" />
    {!compact && <div><div className="text-[15px] font-black tracking-wide text-white">AM ECU MASTER</div><div className="mt-0.5 text-[9px] tracking-[.08em] text-zinc-500">ECU Troubleshooting and Repairs</div></div>}
  </div>;
}

function Button({ children, icon, variant = "primary", className = "", type = "button", onClick }: {
  children: ReactNode; icon?: IconName; variant?: "primary" | "secondary" | "ghost" | "dark"; className?: string; type?: "button" | "submit"; onClick?: () => void;
}) {
  const styles = { primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-200", secondary: "border border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50", ghost: "text-zinc-600 hover:bg-zinc-100", dark: "bg-zinc-900 text-white hover:bg-black" };
  return <button type={type} onClick={onClick} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-all active:scale-[.98] ${styles[variant]} ${className}`}>{icon && <Icon name={icon} size={17}/>} {children}</button>;
}

function TextInput({ label, placeholder, value, onChange, icon, error, type = "text" }: {
  label?: string; placeholder?: string; value: string; onChange: (value: string) => void; icon?: IconName; error?: string; type?: string;
}) {
  return <label className="block">
    {label && <span className="mb-2 block text-xs font-bold text-zinc-700">{label}</span>}
    <span className={`flex items-center gap-2 rounded-xl border bg-white px-3 transition focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-50 ${error ? "border-red-400" : "border-zinc-200"}`}>
      {icon && <Icon name={icon} size={18} className="text-zinc-400"/>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"/>
    </span>
    {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
  </label>;
}

function SelectField({ label, value, onChange, children, error }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode; error?: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-zinc-700">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50 ${error ? "border-red-400 text-zinc-800" : value ? "border-zinc-200 text-zinc-800" : "border-zinc-200 text-zinc-400"}`}>{children}</select>{error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}</label>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,.03)] ${className}`}>{children}</div>;
}

function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: "red" | "green" | "amber" | "blue" | "gray" }) {
  const styles = { red: "bg-red-50 text-red-700 ring-red-100", green: "bg-emerald-50 text-emerald-700 ring-emerald-100", amber: "bg-amber-50 text-amber-700 ring-amber-100", blue: "bg-blue-50 text-blue-700 ring-blue-100", gray: "bg-zinc-100 text-zinc-600 ring-zinc-200" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${styles[tone]}`}>{children}</span>;
}

function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><div className="text-2xl font-black tracking-tight text-zinc-950">{title}</div><div className="mt-1 text-sm text-zinc-500">{description}</div></div>{action}</div>;
}

function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/50 p-4 backdrop-blur-sm" onMouseDown={onClose}>
    <div className={`max-h-[90vh] w-full overflow-auto rounded-2xl bg-white shadow-2xl ${wide ? "max-w-2xl" : "max-w-md"}`} onMouseDown={(e) => e.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4"><div className="font-black text-zinc-900">{title}</div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl text-zinc-500 hover:bg-zinc-100"><Icon name="close" size={19}/></button></div>
      <div className="p-5">{children}</div>
    </div>
  </div>;
}

const navItems: { id: Page; label: string; icon: IconName }[] = [
  { id: "dashboard", label: "داشبورد", icon: "grid" }, { id: "dtc", label: "خطایابی ECU", icon: "scan" },
  { id: "vehicles", label: "مدیریت خودرو", icon: "car" }, { id: "repairs", label: "سوابق تعمیرات", icon: "wrench" },
  { id: "learn", label: "مرکز آموزش", icon: "book" }, { id: "customers", label: "مدیریت مشتریان", icon: "users" },
];

const coreDtcs = [
  { code: "P0300", title: "احتراق ناقص تصادفی / چند سیلندر", severity: "زیاد", tone: "red" as const, system: "موتور", desc: "ECU احتراق ناقص را در چند سیلندر تشخیص داده است.", causes: ["شمع یا کوئل معیوب", "فشار سوخت پایین", "نشتی وکیوم", "کمپرس نامناسب"], steps: ["بررسی Freeze Frame و شمارنده Misfire", "بازدید شمع‌ها و جابه‌جایی کوئل", "تست فشار ریل سوخت", "تست کمپرس سیلندرها"] },
  { code: "P0171", title: "مخلوط سوخت بیش از حد رقیق - بانک ۱", severity: "متوسط", tone: "amber" as const, system: "سوخت", desc: "اصلاح بلندمدت سوخت از محدوده مجاز بالاتر رفته است.", causes: ["نشتی هوای ورودی", "کثیفی سنسور MAF", "انژکتور مسدود", "فشار سوخت کم"], steps: ["خواندن STFT و LTFT", "دود تست منیفولد", "بررسی داده MAF", "تست فشار سوخت"] },
  { code: "P0420", title: "بازده کاتالیست کمتر از حد مجاز", severity: "متوسط", tone: "amber" as const, system: "آلایندگی", desc: "کارایی مبدل کاتالیستی بانک ۱ کمتر از مقدار استاندارد است.", causes: ["فرسودگی کاتالیست", "خرابی سنسور اکسیژن", "نشتی اگزوز", "احتراق ناقص طولانی"], steps: ["بررسی نمودار سنسورهای اکسیژن", "بازدید نشتی اگزوز", "کنترل خطاهای Misfire", "تست دمای ورودی و خروجی کاتالیست"] },
  { code: "P0113", title: "ورودی بالای مدار دمای هوای ورودی", severity: "کم", tone: "blue" as const, system: "سنسورها", desc: "ولتاژ سنسور IAT بیش از محدوده قابل قبول است.", causes: ["سوکت جدا شده", "قطعی سیم سیگنال", "سنسور IAT معیوب"], steps: ["مشاهده دمای IAT در دیاگ", "بررسی سوکت و سیم‌کشی", "اندازه‌گیری مقاومت سنسور"] },
  { code: "U0100", title: "قطع ارتباط با ECU موتور", severity: "زیاد", tone: "red" as const, system: "شبکه CAN", desc: "سایر یونیت‌ها قادر به دریافت پیام از ECU موتور نیستند.", causes: ["ضعف باتری", "قطعی شبکه CAN", "تغذیه ECU", "ایراد داخلی ECU"], steps: ["کنترل ولتاژ باتری", "بررسی فیوز و رله ECU", "اندازه‌گیری مقاومت CAN", "بررسی آب‌خوردگی سوکت ECU"] },
  { code: "C0035", title: "مدار سنسور سرعت چرخ جلو چپ", severity: "متوسط", tone: "amber" as const, system: "ABS", desc: "سیگنال سرعت چرخ جلو چپ نامعتبر یا قطع است.", causes: ["خرابی سنسور ABS", "کثیفی رینگ ABS", "قطعی سیم", "لقی بلبرینگ"], steps: ["مقایسه سرعت چرخ‌ها در Live Data", "بازدید سنسور و رینگ", "تست پیوستگی سیم‌کشی"] },
];

const commonDtcRows: [string, string, "زیاد" | "متوسط" | "کم", string][] = [
  ["P0010", "مدار عملگر موقعیت میل‌سوپاپ ورودی", "متوسط", "موتور"],
  ["P0011", "تایمینگ میل‌سوپاپ ورودی بیش از حد جلو", "زیاد", "موتور"],
  ["P0016", "عدم تطابق میل‌لنگ و میل‌سوپاپ", "زیاد", "موتور"],
  ["P0101", "محدوده یا عملکرد سنسور جریان هوا", "متوسط", "هوای ورودی"],
  ["P0102", "ورودی پایین مدار سنسور جریان هوا", "متوسط", "هوای ورودی"],
  ["P0122", "ورودی پایین سنسور موقعیت دریچه گاز", "زیاد", "دریچه گاز"],
  ["P0128", "دمای موتور پایین‌تر از دمای تنظیم ترموستات", "کم", "خنک‌کاری"],
  ["P0130", "ایراد مدار سنسور اکسیژن بانک ۱ سنسور ۱", "متوسط", "آلایندگی"],
  ["P0133", "پاسخ کند سنسور اکسیژن بانک ۱ سنسور ۱", "متوسط", "آلایندگی"],
  ["P0135", "خرابی گرم‌کن سنسور اکسیژن بانک ۱ سنسور ۱", "متوسط", "آلایندگی"],
  ["P0172", "مخلوط سوخت بیش از حد غنی بانک ۱", "متوسط", "سوخت"],
  ["P0201", "ایراد مدار انژکتور سیلندر ۱", "زیاد", "سوخت"],
  ["P0234", "فشار بوست توربو بیش از حد مجاز", "زیاد", "توربوشارژر"],
  ["P0299", "فشار بوست توربو کمتر از حد مجاز", "زیاد", "توربوشارژر"],
  ["P0301", "احتراق ناقص سیلندر ۱", "زیاد", "موتور"],
  ["P0302", "احتراق ناقص سیلندر ۲", "زیاد", "موتور"],
  ["P0303", "احتراق ناقص سیلندر ۳", "زیاد", "موتور"],
  ["P0304", "احتراق ناقص سیلندر ۴", "زیاد", "موتور"],
  ["P0325", "ایراد مدار سنسور ضربه", "متوسط", "موتور"],
  ["P0335", "ایراد مدار سنسور موقعیت میل‌لنگ", "زیاد", "موتور"],
  ["P0340", "ایراد مدار سنسور موقعیت میل‌سوپاپ", "زیاد", "موتور"],
  ["P0401", "جریان ناکافی سیستم EGR", "متوسط", "آلایندگی"],
  ["P0442", "نشتی کوچک در سیستم بخارات بنزین", "کم", "EVAP"],
  ["P0455", "نشتی بزرگ در سیستم بخارات بنزین", "متوسط", "EVAP"],
  ["P0500", "ایراد سنسور سرعت خودرو", "متوسط", "انتقال قدرت"],
  ["P0505", "ایراد سیستم کنترل دور آرام", "متوسط", "موتور"],
  ["P0562", "ولتاژ پایین سیستم", "زیاد", "برق خودرو"],
  ["P0601", "خطای حافظه داخلی ECU", "زیاد", "ECU"],
  ["P0700", "درخواست روشن شدن چراغ خطا از گیربکس", "زیاد", "گیربکس"],
  ["P0715", "ایراد سنسور دور ورودی گیربکس", "زیاد", "گیربکس"],
  ["P0750", "ایراد شیر برقی تعویض دنده A", "زیاد", "گیربکس"],
  ["B0020", "ایراد مدار ایربگ جانبی چپ", "زیاد", "ایربگ"],
  ["B1000", "خطای داخلی یونیت بدنه", "متوسط", "BCM"],
  ["C0040", "مدار سنسور سرعت چرخ جلو راست", "متوسط", "ABS"],
  ["C0050", "مدار سنسور سرعت چرخ عقب راست", "متوسط", "ABS"],
  ["C0121", "ایراد مدار رله شیر ABS", "زیاد", "ABS"],
  ["U0073", "شبکه ارتباطی CAN غیرفعال", "زیاد", "شبکه CAN"],
  ["U0101", "قطع ارتباط با یونیت گیربکس", "زیاد", "شبکه CAN"],
  ["U0121", "قطع ارتباط با یونیت ABS", "زیاد", "شبکه CAN"],
  ["U0140", "قطع ارتباط با یونیت کنترل بدنه", "متوسط", "شبکه CAN"],
];

const dtcs = [
  ...coreDtcs,
  ...commonDtcRows.map(([code, title, severity, system]) => ({
    code,
    title,
    severity,
    tone: severity === "زیاد" ? "red" as const : severity === "متوسط" ? "amber" as const : "blue" as const,
    system,
    desc: `کد ${code} نشان می‌دهد عملکرد «${title}» خارج از محدوده مورد انتظار ECU قرار گرفته است.`,
    causes: ["خرابی قطعه یا سنسور مرتبط", "قطعی، اتصال کوتاه یا سولفاته شدن سوکت", "تغذیه یا اتصال بدنه نامناسب", "نیاز به بررسی دستورالعمل اختصاصی سازنده"],
    steps: ["ثبت Freeze Frame و بررسی خطاهای همراه", "بازدید سوکت، سیم‌کشی و تغذیه مدار", "مقایسه داده زنده با مقدار استاندارد", "انجام تست قطعه مطابق نقشه سازنده"],
  })),
];

function genericDtc(code: string) {
  const family = code[0];
  const system = family === "P" ? "موتور و انتقال قدرت" : family === "B" ? "بدنه و تجهیزات رفاهی" : family === "C" ? "شاسی، ABS و فرمان" : "شبکه ارتباطی خودرو";
  return {
    code,
    title: "کد معتبر OBD-II؛ نیازمند مرجع اختصاصی سازنده",
    severity: "نامشخص",
    tone: "gray" as const,
    system,
    desc: `کد ${code} در خانواده ${system} قرار دارد. تعریف دقیق این کد ممکن است بر اساس برند، مدل، سال ساخت و نوع ECU متفاوت باشد.`,
    causes: ["ایراد در قطعه یا مدار مرتبط با تعریف سازنده", "قطعی یا اتصال نامناسب سیم‌کشی", "ولتاژ نامناسب یا خطای ارتباطی", "نیاز به نرم‌افزار دیاگ اختصاصی خودرو"],
    steps: ["ثبت مشخصات کامل خودرو و شماره فنی ECU", "خواندن Freeze Frame و خطاهای همراه", "مراجعه به راهنمای تعمیراتی همان سازنده", "تست مدار پیش از تعویض هر قطعه"],
  };
}

const ecuByBrand: Record<string, string[]> = {
  "ایران خودرو": ["Bosch ME7.4.4", "Bosch ME7.4.5", "Bosch ME17.9.71", "Valeo J34P", "Valeo J35", "Siemens EMS", "Continental EMS3120"],
  "سایپا": ["Siemens EMS", "Valeo S2000", "Continental EMS3120", "Bosch ME7.4.4", "Bosch ME17.9.71"],
  "پارس خودرو": ["Hitachi MEC", "Siemens EMS", "Bosch ME7.9.7", "Valeo V42"],
  "مدیران خودرو / MVM": ["Bosch ME7.8.8", "Continental SIM2K", "Delphi MT80", "Bosch ME17.8.8", "Bosch MED17.8.10"],
  "فونیکس": ["Bosch MED17.8.10", "Continental SIM2K-250", "Bosch ME17.8.8", "Delphi MT92"],
  "کرمان موتور": ["Bosch ME17.9.11", "Continental SIM2K", "Delphi MT80", "Bosch EDC17", "Kefico CPEGD"],
  "KMC / JAC": ["Bosch ME17.9.11", "Bosch MED17.8.10", "Delphi MT80", "Continental SIM2K-250", "Bosch EDC17C55"],
  "گروه بهمن": ["Bosch ME17", "Denso SH7058", "Continental EMS", "Delphi DCM3.7", "Bosch MED17.8.10"],
  "فردا موتورز": ["Bosch ME17.8.8", "Delphi MT80", "Continental SIM2K", "Bosch MED17"],
  "آرین پارس موتور / لاماری": ["Bosch MED17.8.10", "Continental SIM2K-250", "Bosch ME17.8.8"],
  "بهمن دیزل": ["Bosch EDC17CV44", "Bosch EDC7", "Delphi DCM3.7", "Denso Diesel ECU"],
  "ماموت / مکث موتور": ["Bosch MED17", "Bosch EDC17C55", "Delphi MT92", "Continental EMS"],
  "تویوتا / لکسوس": ["Denso 89661", "Denso Gen3", "Bosch EDC17", "Denso 76F00XX"],
  "هیوندای / کیا": ["Bosch ME17.9.11", "Continental SIM2K", "Kefico CPEGD", "Bosch EDC17", "Delphi DCM3.7"],
  "رنو": ["Siemens EMS3132", "Siemens EMS3120", "Sagem S2000", "Bosch EDC16", "Continental SID301"],
  "پژو / سیتروئن": ["Bosch ME7.4.4", "Bosch ME7.4.5", "Valeo J34P", "Valeo J35", "Bosch EDC16C3"],
  "نیسان": ["Hitachi MEC", "Hitachi SH7058", "Denso ECU", "Bosch EDC16"],
  "مزدا": ["Denso SH7058", "Mitsubishi E6T", "Bosch ME17", "Denso PCM"],
  "چری": ["Bosch ME7.8.8", "Bosch ME17.8.8", "Delphi MT80", "Continental SIM2K"],
  "جک": ["Bosch ME17.9.11", "Delphi MT80", "Bosch EDC17", "Continental SIM2K"],
  "لیفان": ["Delphi MT22", "Bosch ME7.8.8", "Continental M7.9.7", "Bosch ME17"],
  "برلیانس": ["Bosch ME7.9.7", "Delphi MT22", "Bosch ME17.8.8", "Continental EMS"],
};

const initialRepairs = [
  { id: "AM-2418", customer: "رضا کریمی", car: "پژو ۲۰۷ اتومات", plate: "۴۵ ب ۸۷۶ ایران ۱۱", date: "۱۴۰۳/۰۸/۲۴", status: "در حال تعمیر", dtc: "P0300", symptom: "لرزش موتور در دور آرام و روشن شدن چراغ چک", result: "خرابی کوئل سیلندر ۲ و فرسودگی شمع‌ها", note: "کوئل و چهار عدد شمع تعویض شد؛ تست نهایی بدون خطا." },
  { id: "AM-2417", customer: "سارا احمدی", car: "ام‌وی‌ام X55 Pro", plate: "۲۱ ج ۴۵۲ ایران ۴۴", date: "۱۴۰۳/۰۸/۲۲", status: "تکمیل شده", dtc: "P0171", symptom: "افت شتاب و افزایش مصرف سوخت", result: "نشتی از اورینگ منیفولد هوا", note: "اورینگ تعویض و مقادیر Fuel Trim نرمال شد." },
  { id: "AM-2416", customer: "علی مرادی", car: "دنا پلاس توربو", plate: "۶۷ د ۱۲۳ ایران ۲۲", date: "۱۴۰۳/۰۸/۲۰", status: "منتظر قطعه", dtc: "P0420", symptom: "روشن شدن متناوب چراغ چک", result: "راندمان پایین کاتالیست", note: "قطعه سفارش داده شد؛ سنسورهای اکسیژن سالم هستند." },
  { id: "AM-2415", customer: "مریم توکلی", car: "کیا سراتو", plate: "۳۲ م ۹۸۱ ایران ۵۵", date: "۱۴۰۳/۰۸/۱۸", status: "تکمیل شده", dtc: "C0035", symptom: "روشن شدن چراغ ABS", result: "قطع‌شدگی سیم سنسور چرخ جلو", note: "دسته سیم ترمیم و خطا پاک شد." },
];

const customers = [
  { name: "رضا کریمی", phone: "۰۹۱۲ ۴۸۵ ۲۱۲۱", cars: ["پژو ۲۰۷ اتومات", "سمند EF7"], repairs: 5, last: "۲۴ آبان ۱۴۰۳", initials: "رک" },
  { name: "سارا احمدی", phone: "۰۹۳۵ ۱۱۸ ۴۵۶۷", cars: ["ام‌وی‌ام X55 Pro"], repairs: 2, last: "۲۲ آبان ۱۴۰۳", initials: "سا" },
  { name: "علی مرادی", phone: "۰۹۱۹ ۷۶۵ ۱۰۹۰", cars: ["دنا پلاس توربو"], repairs: 3, last: "۲۰ آبان ۱۴۰۳", initials: "عم" },
  { name: "مریم توکلی", phone: "۰۹۱۲ ۳۴۰ ۸۸۲۱", cars: ["کیا سراتو", "پراید ۱۳۱"], repairs: 7, last: "۱۸ آبان ۱۴۰۳", initials: "مت" },
];

const articles = [
  { id: 1, title: "راهنمای جامع تحلیل Fuel Trim", category: "عیب‌یابی پیشرفته", time: "۱۲ دقیقه", level: "متوسط", icon: "speed" as IconName, color: "bg-red-600", body: "اصلاح سوخت کوتاه‌مدت و بلندمدت از مهم‌ترین پارامترهای تشخیص وضعیت پاشش و هوای ورودی هستند. ابتدا موتور را به دمای کاری برسانید، سپس STFT و LTFT را در دور آرام و ۲۵۰۰ دور مقایسه کنید. مقادیر مثبت بالا معمولاً نشانه مخلوط رقیق و مقادیر منفی بالا نشانه پاشش بیش از حد سوخت است." },
  { id: 2, title: "شبکه CAN از پایه تا تست عملی", category: "برق و الکترونیک", time: "۱۸ دقیقه", level: "پیشرفته", icon: "scan" as IconName, color: "bg-zinc-900", body: "شبکه CAN ارتباط سریع و مقاوم میان یونیت‌های خودرو را فراهم می‌کند. در خودروی خاموش و شبکه بدون تغذیه، مقاومت بین CAN-H و CAN-L معمولاً باید نزدیک ۶۰ اهم باشد. مقاومت ۱۲۰ اهم می‌تواند نشانه قطع یکی از ترمینیشن‌ها و مقاومت بسیار پایین نشانه اتصال کوتاه باشد." },
  { id: 3, title: "اصول پروگرام و کلون ECU", category: "پروگرام ECU", time: "۲۴ دقیقه", level: "پیشرفته", icon: "file" as IconName, color: "bg-blue-600", body: "پیش از هر عملیات پروگرام، منبع تغذیه پایدار، بکاپ کامل Flash و EEPROM و شناسایی دقیق شماره سخت‌افزار و نرم‌افزار ضروری است. هرگز در زمان نوشتن فایل اتصال ابزار یا تغذیه را قطع نکنید و نسخه اصلی را با مشخصات خودرو آرشیو کنید." },
  { id: 4, title: "تست سنسورها با اسیلوسکوپ", category: "آموزش کاربردی", time: "۱۵ دقیقه", level: "متوسط", icon: "trend" as IconName, color: "bg-emerald-600", body: "اسیلوسکوپ امکان مشاهده شکل واقعی سیگنال را می‌دهد. تنظیم صحیح Time Base، دامنه ولتاژ و نوع Trigger برای ثبت پایدار سیگنال حیاتی است. برای سنسور دور موتور القایی دامنه و یکنواختی موج و برای Hall سطح High و Low را بررسی کنید." },
];

function Sidebar({ page, setPage, open, setOpen, openSupport }: { page: Page; setPage: (p: Page) => void; open: boolean; setOpen: (o: boolean) => void; openSupport: () => void }) {
  return <>
    {open && <div className="fixed inset-0 z-30 bg-black/45 lg:hidden" onClick={() => setOpen(false)}/>}
    <aside className={`fixed inset-y-0 right-0 z-40 flex w-64 flex-col bg-zinc-950 text-white transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5"><Logo/><button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/10 lg:hidden"><Icon name="close"/></button></div>
      <nav className="flex-1 space-y-1 p-3 pt-6">{navItems.map((item) => <button key={item.id} onClick={() => { setPage(item.id); setOpen(false); }} className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${page === item.id ? "bg-red-600 text-white shadow-lg shadow-red-950/30" : "text-zinc-400 hover:bg-white/[.06] hover:text-white"}`}><Icon name={item.icon} size={19}/>{item.label}{page === item.id && <span className="mr-auto size-1.5 rounded-full bg-white"/>}</button>)}</nav>
      <div className="m-3 rounded-2xl border border-white/10 bg-white/[.04] p-4"><div className="mb-3 grid size-9 place-items-center rounded-xl bg-red-600/15 text-red-500"><Icon name="headset" size={19}/></div><div className="text-sm font-bold">نیاز به راهنمایی دارید؟</div><div className="mt-1 text-xs leading-5 text-zinc-500">کارشناس فنی در کنار شما است.</div><button onClick={openSupport} className="mt-3 w-full rounded-lg border border-white/10 py-2 text-xs font-bold text-zinc-300 hover:bg-white/10">پشتیبانی فنی</button></div>
      <div className="border-t border-white/10 px-5 py-4 text-[10px] text-zinc-600">نسخه ۲.۴.۰ · AM Systems</div>
    </aside>
  </>;
}

function Header({ onMenu, onNotifications, globalSearch, setGlobalSearch, goDtc }: { onMenu: () => void; onNotifications: () => void; globalSearch: string; setGlobalSearch: (s: string) => void; goDtc: () => void }) {
  return <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
    <button onClick={onMenu} className="grid size-10 shrink-0 place-items-center rounded-xl border border-zinc-200 text-zinc-700 lg:hidden"><Icon name="menu"/></button>
    <form className="hidden max-w-md flex-1 md:block" onSubmit={(e) => { e.preventDefault(); if (globalSearch.trim()) goDtc(); }}><TextInput value={globalSearch} onChange={setGlobalSearch} icon="search" placeholder="جست‌وجوی کد خطا، خودرو یا مشتری..."/></form>
    <div className="mr-auto flex items-center gap-2 sm:gap-3">
      <button onClick={onNotifications} className="relative grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50"><Icon name="bell" size={19}/><span className="absolute -left-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-600 text-[9px] font-bold text-white">۳</span></button>
      <div className="hidden h-8 w-px bg-zinc-200 sm:block"/>
      <div className="hidden text-left sm:block"><div className="text-xs font-bold text-zinc-900">عباس محمدی</div><div className="mt-0.5 text-[10px] text-zinc-500">مدیر تعمیرگاه</div></div>
      <img src="/am-ecu-master-logo.png" alt="لوگوی AM ECU MASTER" className="size-10 rounded-xl object-cover ring-1 ring-zinc-200" />
    </div>
  </header>;
}

function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  const stats = [
    { label: "خودروهای ثبت‌شده", value: "۱,۲۴۸", change: "۱۲٪ این ماه", icon: "car" as IconName, page: "vehicles" as Page },
    { label: "مشتریان فعال", value: "۸۶۴", change: "۸٪ این ماه", icon: "users" as IconName, page: "customers" as Page },
    { label: "تعمیرات این ماه", value: "۱۴۲", change: "۲۴ مورد این هفته", icon: "wrench" as IconName, page: "repairs" as Page },
    { label: "پرونده‌های باز", value: "۱۸", change: "۵ مورد فوری", icon: "clock" as IconName, page: "repairs" as Page },
  ];
  return <div>
    <PageHeader title="سلام عباس، روز بخیر" description="خلاصه عملکرد تعمیرگاه شما در امروز، دوشنبه ۲۸ آبان ۱۴۰۳" action={<Button icon="plus" onClick={() => navigate("vehicles")}>پذیرش خودرو</Button>}/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((s, i) => <Card key={s.label} className="group p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/50">
      <div className="flex items-start justify-between"><div className={`grid size-11 place-items-center rounded-xl ${i === 0 ? "bg-red-50 text-red-600" : "bg-zinc-100 text-zinc-700"}`}><Icon name={s.icon}/></div><Badge tone={i === 3 ? "amber" : "green"}><Icon name="trend" size={12}/> {s.change}</Badge></div>
      <div className="mt-5 text-3xl font-black tracking-tight text-zinc-950">{s.value}</div><div className="mt-1 text-xs text-zinc-500">{s.label}</div>
      <button onClick={() => navigate(s.page)} className="mt-4 flex items-center gap-1 text-xs font-bold text-zinc-500 transition group-hover:text-red-600">مشاهده جزئیات <Icon name="arrow" size={14}/></button>
    </Card>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
      <Card><div className="flex items-center justify-between border-b border-zinc-100 p-5"><div><div className="font-black text-zinc-900">آخرین پذیرش‌ها</div><div className="mt-1 text-xs text-zinc-500">پرونده‌های اخیر تعمیرگاه</div></div><Button variant="ghost" onClick={() => navigate("repairs")}>مشاهده همه <Icon name="arrow" size={15}/></Button></div>
        <div className="divide-y divide-zinc-100">{initialRepairs.slice(0, 4).map((r) => <div key={r.id} className="flex items-center gap-3 p-4 sm:px-5"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600"><Icon name="car" size={19}/></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-zinc-900">{r.car}</div><div className="mt-1 truncate text-xs text-zinc-500">{r.customer} · {r.dtc}</div></div><div className="hidden text-left sm:block"><div className="text-xs text-zinc-500">{r.date}</div><div className="mt-1"><Badge tone={r.status === "تکمیل شده" ? "green" : r.status === "منتظر قطعه" ? "amber" : "blue"}>{r.status}</Badge></div></div></div>)}</div>
      </Card>
      <div className="space-y-5">
        <Card className="overflow-hidden bg-zinc-950 p-5 text-white"><div className="flex items-center justify-between"><div className="grid size-11 place-items-center rounded-xl bg-red-600"><Icon name="scan"/></div><Badge tone="red">ابزار سریع</Badge></div><div className="mt-5 text-lg font-black">کد خطا دارید؟</div><div className="mt-1 text-xs leading-6 text-zinc-400">کد DTC را جست‌وجو کنید و مسیر عیب‌یابی استاندارد را ببینید.</div><Button className="mt-4 w-full" onClick={() => navigate("dtc")}>جست‌وجوی کد خطا</Button></Card>
        <Card className="p-5"><div className="flex items-center justify-between"><div><div className="text-sm font-black text-zinc-900">عملکرد ماهانه</div><div className="mt-1 text-xs text-zinc-500">نرخ تکمیل تعمیرات</div></div><div className="text-xl font-black text-zinc-900">۸۷٪</div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100"><div className="h-full w-[87%] rounded-full bg-red-600"/></div><div className="mt-3 flex justify-between text-[11px] text-zinc-500"><span>۱۲۴ پرونده تکمیل‌شده</span><span>هدف: ۹۰٪</span></div></Card>
      </div>
    </div>
  </div>;
}

function DtcPage({ initialSearch = "" }: { initialSearch?: string }) {
  const [query, setQuery] = useState(initialSearch);
  const [selected, setSelected] = useState(dtcs[0]);
  const results = useMemo(() => {
    const normalized = query.trim().toUpperCase();
    const matches = dtcs.filter((d) => `${d.code} ${d.title} ${d.system}`.toUpperCase().includes(normalized));
    if (!matches.length && /^[PBCU][0-9A-F]{4}$/.test(normalized)) return [genericDtc(normalized)];
    return matches;
  }, [query]);
  return <div><PageHeader title="خطایابی ECU" description="جست‌وجو و تحلیل کدهای خطای استاندارد OBD-II"/>
    <Card className="mb-5 overflow-hidden"><div className="bg-zinc-950 p-5 sm:p-7"><div className="mx-auto max-w-2xl text-center"><div className="text-lg font-black text-white">کد خطا را وارد کنید</div><div className="mt-2 text-xs text-zinc-400">مثال: P0300، P0171، U0100 یا بخشی از شرح خطا</div><div className="mt-5 flex flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row"><div className="flex flex-1 items-center gap-3 px-3"><Icon name="search" className="text-zinc-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} dir="ltr" placeholder="P0..." className="h-11 w-full bg-transparent text-left font-mono text-base font-bold uppercase outline-none"/></div><Button className="sm:px-7">جست‌وجو</Button></div></div></div></Card>
    {results.length ? <div className="grid gap-5 xl:grid-cols-[.75fr_1.25fr]"><Card className="self-start"><div className="border-b border-zinc-100 p-4 text-sm font-black">نتایج جست‌وجو <span className="mr-1 text-xs font-normal text-zinc-400">({results.length} کد)</span></div><div className="max-h-[540px] divide-y divide-zinc-100 overflow-auto">{results.map((d) => <button key={d.code} onClick={() => setSelected(d)} className={`w-full p-4 text-right transition ${selected.code === d.code ? "bg-red-50/70" : "hover:bg-zinc-50"}`}><div className="flex items-center justify-between"><span dir="ltr" className="font-mono text-sm font-black text-red-600">{d.code}</span><Badge tone={d.tone}>اهمیت: {d.severity}</Badge></div><div className="mt-2 text-xs font-bold text-zinc-800">{d.title}</div><div className="mt-1 text-[11px] text-zinc-400">{d.system}</div></button>)}</div></Card>
      <Card className="overflow-hidden"><div className="border-b border-zinc-100 p-5"><div className="flex flex-wrap items-center gap-3"><span dir="ltr" className="rounded-xl bg-red-600 px-4 py-2 font-mono text-xl font-black text-white">{selected.code}</span><div className="text-lg font-black text-zinc-900">{selected.title}</div></div><div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-600">{selected.desc}</div></div><div className="grid gap-6 p-5 md:grid-cols-2"><div><div className="mb-3 flex items-center gap-2 text-sm font-black text-zinc-900"><span className="grid size-7 place-items-center rounded-lg bg-amber-50 text-amber-600"><Icon name="warning" size={15}/></span>علت‌های احتمالی</div><div className="space-y-2.5">{selected.causes.map((c) => <div key={c} className="flex gap-2 text-xs leading-6 text-zinc-600"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-500"/>{c}</div>)}</div></div><div><div className="mb-3 flex items-center gap-2 text-sm font-black text-zinc-900"><span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><Icon name="check" size={15}/></span>مراحل پیشنهادی عیب‌یابی</div><div className="space-y-3">{selected.steps.map((s, i) => <div key={s} className="flex gap-3 text-xs leading-6 text-zinc-600"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">{i + 1}</span>{s}</div>)}</div></div></div></Card></div>
    : <Card className="py-16 text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-zinc-100 text-zinc-400"><Icon name="search" size={25}/></div><div className="mt-4 font-black text-zinc-900">کدی پیدا نشد</div><div className="mt-2 text-sm text-zinc-500">عبارت دیگری مانند P0300 را امتحان کنید.</div><Button variant="secondary" className="mt-5" onClick={() => setQuery("")}>پاک کردن جست‌وجو</Button></Card>}
  </div>;
}

function VehiclePage({ notify }: { notify: (message: string) => void }) {
  const [form, setForm] = useState({ brand: "", model: "", year: "", ecu: "", customer: "", phone: "", plate: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value, ...(key === "brand" ? { ecu: "" } : {}) }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      if (key === "brand") delete next.ecu;
      return next;
    });
  };
  const submit = (e: FormEvent) => { e.preventDefault(); const required = ["brand", "model", "year", "ecu", "customer", "phone"]; const next: Record<string, string> = {}; required.forEach((k) => { if (!form[k as keyof typeof form].trim()) next[k] = "تکمیل این فیلد الزامی است."; }); if (form.phone && form.phone.replace(/\D/g, "").length < 10) next.phone = "شماره تماس معتبر وارد کنید."; setErrors(next); if (!Object.keys(next).length) { notify("خودرو و پرونده مشتری با موفقیت ثبت شد."); setForm({ brand: "", model: "", year: "", ecu: "", customer: "", phone: "", plate: "" }); } };
  return <div><PageHeader title="مدیریت خودرو" description="پذیرش خودروی جدید و ثبت مشخصات ECU" action={<Badge tone="gray">۱۲۴۸ خودرو ثبت‌شده</Badge>}/>
    <form onSubmit={submit}><div className="grid gap-5 xl:grid-cols-[1.3fr_.7fr]"><Card className="p-5 sm:p-6"><div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-5"><div className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600"><Icon name="car"/></div><div><div className="font-black text-zinc-900">مشخصات خودرو</div><div className="mt-1 text-xs text-zinc-500">اطلاعات فنی خودرو و یونیت موتور</div></div></div><div className="grid gap-5 sm:grid-cols-2">
      <SelectField label="برند / گروه خودرویی *" value={form.brand} onChange={(v) => update("brand", v)} error={errors.brand}><option value="" disabled hidden>انتخاب برند</option>{Object.keys(ecuByBrand).map((b) => <option key={b}>{b}</option>)}</SelectField>
      <TextInput label="مدل خودرو *" placeholder="مثال: X55 Pro" value={form.model} onChange={(v) => update("model", v)} error={errors.model}/>
      <TextInput label="سال ساخت *" placeholder="مثال: ۱۴۰۲" value={form.year} onChange={(v) => update("year", v)} error={errors.year}/>
      <SelectField label="نوع ECU *" value={form.ecu} onChange={(v) => update("ecu", v)} error={errors.ecu}><option value="" disabled hidden>{form.brand ? "انتخاب نوع ECU" : "ابتدا برند را انتخاب کنید"}</option>{(ecuByBrand[form.brand] || []).map((ecu) => <option key={ecu}>{ecu}</option>)}</SelectField>
      <div className="sm:col-span-2"><TextInput label="شماره پلاک" placeholder="مثال: ۴۵ ب ۸۷۶ ایران ۱۱" value={form.plate} onChange={(v) => update("plate", v)}/></div>
    </div></Card>
    <Card className="p-5 sm:p-6"><div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-5"><div className="grid size-10 place-items-center rounded-xl bg-zinc-100 text-zinc-700"><Icon name="user"/></div><div><div className="font-black text-zinc-900">مشخصات مشتری</div><div className="mt-1 text-xs text-zinc-500">اطلاعات مالک خودرو</div></div></div><div className="space-y-5"><TextInput label="نام و نام خانوادگی *" placeholder="نام مشتری" value={form.customer} onChange={(v) => update("customer", v)} error={errors.customer}/><TextInput label="شماره تماس *" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} type="tel"/><div className="rounded-xl bg-zinc-50 p-4 text-xs leading-6 text-zinc-500">با ثبت پذیرش، یک پرونده جدید برای مشتری ساخته می‌شود و کد پیگیری در اختیار شما قرار می‌گیرد.</div></div></Card></div><div className="mt-5 flex justify-end gap-3"><Button variant="secondary" onClick={() => setForm({ brand: "", model: "", year: "", ecu: "", customer: "", phone: "", plate: "" })}>پاک کردن</Button><Button type="submit" icon="check">ثبت و ایجاد پرونده</Button></div></form>
  </div>;
}

function RepairsPage({ notify }: { notify: (message: string) => void }) {
  const [records, setRecords] = useState(initialRepairs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("همه");
  const [detail, setDetail] = useState<typeof initialRepairs[number] | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const filtered = records.filter((r) => (filter === "همه" || r.status === filter) && `${r.customer} ${r.car} ${r.dtc} ${r.id}`.toLowerCase().includes(search.toLowerCase()));
  const addRepair = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const customer = String(fd.get("customer") || ""); const car = String(fd.get("car") || ""); if (!customer || !car) return; setRecords((r) => [{ id: `AM-${2420 + r.length}`, customer, car, plate: "ثبت نشده", date: "امروز", status: "در حال تعمیر", dtc: String(fd.get("dtc") || "در انتظار دیاگ"), symptom: String(fd.get("symptom") || "ثبت نشده"), result: "در انتظار بررسی", note: "پرونده تازه ثبت شده است." }, ...r]); setNewOpen(false); notify("پرونده تعمیر جدید با موفقیت ثبت شد."); };
  return <div><PageHeader title="سوابق تعمیرات" description="مدیریت پرونده‌ها، نتایج دیاگ و گزارش تعمیر" action={<Button icon="plus" onClick={() => setNewOpen(true)}>ثبت تعمیر جدید</Button>}/>
    <Card><div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row"><div className="max-w-md flex-1"><TextInput value={search} onChange={setSearch} icon="search" placeholder="جست‌وجوی مشتری، خودرو یا کد خطا..."/></div><div className="flex items-center gap-2 overflow-x-auto"><Icon name="filter" size={17} className="text-zinc-400"/>{["همه", "در حال تعمیر", "منتظر قطعه", "تکمیل شده"].map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-bold ${filter === f ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{f}</button>)}</div></div>
      {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-right"><thead><tr className="border-b border-zinc-100 bg-zinc-50/70 text-[11px] text-zinc-500"><th className="px-5 py-3 font-bold">شماره پرونده</th><th className="px-5 py-3 font-bold">مشتری / خودرو</th><th className="px-5 py-3 font-bold">کد خطا</th><th className="px-5 py-3 font-bold">تاریخ پذیرش</th><th className="px-5 py-3 font-bold">وضعیت</th><th className="px-5 py-3"/></tr></thead><tbody className="divide-y divide-zinc-100">{filtered.map((r) => <tr key={r.id} className="text-sm hover:bg-zinc-50/70"><td className="px-5 py-4 font-mono text-xs font-bold text-zinc-500">{r.id}</td><td className="px-5 py-4"><div className="font-bold text-zinc-900">{r.car}</div><div className="mt-1 text-xs text-zinc-500">{r.customer} · {r.plate}</div></td><td className="px-5 py-4"><span dir="ltr" className="font-mono text-xs font-black text-red-600">{r.dtc}</span></td><td className="px-5 py-4 text-xs text-zinc-500">{r.date}</td><td className="px-5 py-4"><Badge tone={r.status === "تکمیل شده" ? "green" : r.status === "منتظر قطعه" ? "amber" : "blue"}>{r.status}</Badge></td><td className="px-5 py-4"><button title="مشاهده جزئیات" onClick={() => setDetail(r)} className="grid size-9 place-items-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-red-600"><Icon name="more"/></button></td></tr>)}</tbody></table></div> : <div className="py-16 text-center text-sm text-zinc-500">پرونده‌ای با این مشخصات پیدا نشد.</div>}</Card>
    {detail && <Modal title={`جزئیات پرونده ${detail.id}`} onClose={() => setDetail(null)} wide><div className="grid gap-3 sm:grid-cols-3">{[["مشتری", detail.customer], ["خودرو", detail.car], ["وضعیت", detail.status]].map(([a,b]) => <div key={a} className="rounded-xl bg-zinc-50 p-3"><div className="text-[10px] text-zinc-400">{a}</div><div className="mt-1 text-xs font-bold text-zinc-800">{b}</div></div>)}</div><div className="mt-5 space-y-4">{[["کد خطا و نتیجه دیاگ", `${detail.dtc} — ${detail.result}`], ["علائم اولیه", detail.symptom], ["اقدامات و یادداشت تعمیرکار", detail.note]].map(([a,b]) => <div key={a}><div className="text-xs font-black text-zinc-800">{a}</div><div className="mt-2 rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-xs leading-6 text-zinc-600">{b}</div></div>)}</div><Button className="mt-5 w-full" icon="download">دریافت گزارش پرونده</Button></Modal>}
    {newOpen && <Modal title="ثبت تعمیر جدید" onClose={() => setNewOpen(false)}><form onSubmit={addRepair} className="space-y-4"><label className="block"><span className="mb-2 block text-xs font-bold">نام مشتری *</span><input name="customer" required className="h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-red-500" placeholder="نام و نام خانوادگی"/></label><label className="block"><span className="mb-2 block text-xs font-bold">خودرو *</span><input name="car" required className="h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-red-500" placeholder="برند و مدل خودرو"/></label><label className="block"><span className="mb-2 block text-xs font-bold">کد خطا</span><input name="dtc" dir="ltr" className="h-11 w-full rounded-xl border border-zinc-200 px-3 text-left font-mono text-sm outline-none focus:border-red-500" placeholder="P0000"/></label><label className="block"><span className="mb-2 block text-xs font-bold">علائم گزارش‌شده</span><textarea name="symptom" className="min-h-24 w-full rounded-xl border border-zinc-200 p-3 text-sm outline-none focus:border-red-500" placeholder="شرح علائم خودرو..."/></label><Button type="submit" className="w-full" icon="check">ثبت پرونده</Button></form></Modal>}
  </div>;
}

function LearningPage() {
  const [category, setCategory] = useState("همه");
  const [article, setArticle] = useState<typeof articles[number] | null>(null);
  const categories = ["همه", "عیب‌یابی پیشرفته", "برق و الکترونیک", "پروگرام ECU", "آموزش کاربردی"];
  return <div><PageHeader title="مرکز آموزش ECU" description="دانش فنی، مقالات تخصصی و آموزش‌های کاربردی"/>
    <Card className="mb-5 overflow-hidden bg-zinc-950 p-6 text-white sm:p-8"><div className="relative z-10 max-w-xl"><Badge tone="red">مجموعه پیشنهادی این هفته</Badge><div className="mt-4 text-2xl font-black leading-10">از داده‌های دیاگ تا تشخیص قطعی</div><div className="mt-2 text-sm leading-7 text-zinc-400">در این مسیر آموزشی، تحلیل پارامترها و تبدیل داده خام به یک تشخیص دقیق را قدم‌به‌قدم یاد بگیرید.</div><Button className="mt-5" icon="play" onClick={() => setArticle(articles[0])}>شروع یادگیری</Button></div></Card>
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${category === c ? "bg-zinc-900 text-white" : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"}`}>{c}</button>)}</div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{articles.filter((a) => category === "همه" || a.category === category).map((a) => <Card key={a.id} className="group overflow-hidden"><div className={`relative h-36 ${a.color} p-5`}><div className="grid size-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur"><Icon name={a.icon}/></div><div className="absolute bottom-4 left-4"><Badge>{a.level}</Badge></div><div className="absolute inset-x-0 bottom-0 h-px bg-white/20"/></div><div className="p-5"><div className="text-[11px] font-bold text-red-600">{a.category}</div><div className="mt-2 min-h-12 text-sm font-black leading-6 text-zinc-900">{a.title}</div><div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4"><span className="flex items-center gap-1 text-[11px] text-zinc-400"><Icon name="clock" size={14}/>{a.time}</span><button onClick={() => setArticle(a)} className="flex items-center gap-1 text-xs font-bold text-zinc-700 group-hover:text-red-600">مطالعه مقاله <Icon name="arrow" size={14}/></button></div></div></Card>)}</div>
    {article && <Modal title={article.title} onClose={() => setArticle(null)} wide><div className="flex gap-2"><Badge tone="red">{article.category}</Badge><Badge>{article.time}</Badge><Badge tone="blue">{article.level}</Badge></div><div className="mt-5 text-sm leading-8 text-zinc-600">{article.body}</div><div className="mt-5 rounded-xl border-r-4 border-red-600 bg-red-50 p-4 text-xs leading-6 text-red-900">نکته ایمنی: پیش از انجام تست‌های الکتریکی، دستورالعمل سازنده و شرایط اتصال ابزار اندازه‌گیری را بررسی کنید.</div><Button className="mt-5" icon="check" onClick={() => setArticle(null)}>علامت‌گذاری به‌عنوان مطالعه‌شده</Button></Modal>}
  </div>;
}

function CustomersPage({ notify }: { notify: (message: string) => void }) {
  const [customerList, setCustomerList] = useState(customers);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<typeof customers[number] | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [addErrors, setAddErrors] = useState<Record<string, string>>({});
  const filtered = customerList.filter((c) => `${c.name} ${c.phone} ${c.cars.join(" ")}`.includes(search));
  const addCustomer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const car = String(fd.get("car") || "").trim();
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "تکمیل این فیلد الزامی است.";
    if (!phone) nextErrors.phone = "تکمیل این فیلد الزامی است.";
    if (!car) nextErrors.car = "تکمیل این فیلد الزامی است.";
    setAddErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const parts = name.split(/\s+/);
    const initials = `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`;
    setCustomerList((list) => [{ name, phone, cars: [car], repairs: 0, last: "امروز", initials }, ...list]);
    setNewOpen(false);
    setAddErrors({});
    notify("مشتری جدید با موفقیت ثبت شد.");
  };
  return <div><PageHeader title="مدیریت مشتریان" description="اطلاعات تماس، خودروها و تاریخچه خدمات مشتریان" action={<Button icon="plus" onClick={() => setNewOpen(true)}>افزودن مشتری</Button>}/>
    <div className="mb-5 max-w-md"><TextInput value={search} onChange={setSearch} icon="search" placeholder="جست‌وجوی نام، تلفن یا خودرو..."/></div>
    {filtered.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((c, i) => <Card key={c.name} className="p-5"><div className="flex items-center gap-3"><div className={`grid size-12 place-items-center rounded-2xl text-sm font-black ${i % 2 ? "bg-zinc-900 text-white" : "bg-red-50 text-red-700"}`}>{c.initials}</div><div className="min-w-0 flex-1"><div className="font-black text-zinc-900">{c.name}</div><div dir="ltr" className="mt-1 text-right text-xs text-zinc-500">{c.phone}</div></div><Badge tone="green">فعال</Badge></div><div className="my-5 grid grid-cols-2 divide-x divide-x-reverse divide-zinc-100 rounded-xl bg-zinc-50 p-3 text-center"><div><div className="text-lg font-black">{c.cars.length}</div><div className="text-[10px] text-zinc-400">خودرو</div></div><div><div className="text-lg font-black">{c.repairs}</div><div className="text-[10px] text-zinc-400">سابقه تعمیر</div></div></div><div className="flex items-center gap-2 text-xs text-zinc-500"><Icon name="car" size={15}/><span className="truncate">{c.cars.join("، ")}</span></div><div className="mt-3 flex items-center gap-2 text-xs text-zinc-500"><Icon name="calendar" size={15}/>آخرین مراجعه: {c.last}</div><Button variant="secondary" className="mt-5 w-full" onClick={() => setDetail(c)}>مشاهده پرونده و سوابق</Button></Card>)}</div> : <Card className="py-16 text-center"><div className="font-black">مشتری‌ای پیدا نشد</div><div className="mt-2 text-sm text-zinc-500">عبارت جست‌وجو را تغییر دهید.</div></Card>}
    {detail && <Modal title={`پرونده ${detail.name}`} onClose={() => setDetail(null)} wide><div className="flex items-center gap-4 rounded-xl bg-zinc-950 p-4 text-white"><div className="grid size-12 place-items-center rounded-xl bg-red-600 font-black">{detail.initials}</div><div><div className="font-black">{detail.name}</div><div dir="ltr" className="mt-1 text-right text-xs text-zinc-400">{detail.phone}</div></div><Button variant="secondary" className="mr-auto" icon="phone">تماس</Button></div><div className="mt-5 text-sm font-black">خودروهای ثبت‌شده</div><div className="mt-3 space-y-2">{detail.cars.map((car) => <div key={car} className="flex items-center gap-3 rounded-xl border border-zinc-100 p-3"><div className="grid size-9 place-items-center rounded-lg bg-zinc-100"><Icon name="car" size={17}/></div><div className="text-xs font-bold">{car}</div><Badge tone="gray">فعال</Badge></div>)}</div><div className="mt-5 text-sm font-black">خلاصه سوابق</div><div className="mt-3 rounded-xl bg-zinc-50 p-4 text-xs leading-7 text-zinc-600">این مشتری {detail.repairs} سابقه تعمیر ثبت‌شده دارد. آخرین مراجعه در تاریخ {detail.last} انجام شده است. گزارش کامل سرویس‌ها و قطعات مصرفی در پرونده دیجیتال نگهداری می‌شود.</div></Modal>}
    {newOpen && <Modal title="افزودن مشتری جدید" onClose={() => { setNewOpen(false); setAddErrors({}); }}><form onSubmit={addCustomer} noValidate className="space-y-4"><label className="block"><span className="mb-2 block text-xs font-bold text-zinc-700">نام و نام خانوادگی *</span><input name="name" className={`h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-red-500 ${addErrors.name ? "border-red-400" : "border-zinc-200"}`} placeholder="مثال: امیر رضایی"/>{addErrors.name && <span className="mt-1.5 block text-xs text-red-600">{addErrors.name}</span>}</label><label className="block"><span className="mb-2 block text-xs font-bold text-zinc-700">شماره تماس *</span><input name="phone" type="tel" className={`h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-red-500 ${addErrors.phone ? "border-red-400" : "border-zinc-200"}`} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"/>{addErrors.phone && <span className="mt-1.5 block text-xs text-red-600">{addErrors.phone}</span>}</label><label className="block"><span className="mb-2 block text-xs font-bold text-zinc-700">خودرو *</span><input name="car" className={`h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-red-500 ${addErrors.car ? "border-red-400" : "border-zinc-200"}`} placeholder="مثال: دنا پلاس توربو"/>{addErrors.car && <span className="mt-1.5 block text-xs text-red-600">{addErrors.car}</span>}</label><Button type="submit" className="w-full" icon="check">ثبت مشتری</Button></form></Modal>}
  </div>;
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [support, setSupport] = useState(false);
  const [toast, setToast] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3500); };
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div dir="rtl" className="min-h-screen bg-zinc-50 text-zinc-900">
    <Sidebar page={page} setPage={go} open={mobileOpen} setOpen={setMobileOpen} openSupport={() => setSupport(true)}/>
    <div className="lg:pr-64"><Header onMenu={() => setMobileOpen(true)} onNotifications={() => setNotifications(true)} globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} goDtc={() => go("dtc")}/><main className="mx-auto max-w-[1500px] p-4 sm:p-7">
      {page === "dashboard" && <Dashboard navigate={go}/>}
      {page === "dtc" && <DtcPage initialSearch={globalSearch}/>}
      {page === "vehicles" && <VehiclePage notify={notify}/>}
      {page === "repairs" && <RepairsPage notify={notify}/>}
      {page === "learn" && <LearningPage/>}
      {page === "customers" && <CustomersPage notify={notify}/>}
    </main></div>
    {notifications && <Modal title="اعلان‌ها" onClose={() => setNotifications(false)}><div className="space-y-3">{[["پرونده AM-2418 به‌روزرسانی شد", "کوئل جدید نصب و تست نهایی انجام شد.", "۵ دقیقه پیش"], ["زمان پیگیری مشتری", "برای خودروی ام‌وی‌ام X55 با مشتری تماس بگیرید.", "۱ ساعت پیش"], ["موجودی قطعه", "موجودی سنسور اکسیژن بوش به ۲ عدد رسیده است.", "دیروز"]].map((n, i) => <div key={n[0]} className="flex gap-3 rounded-xl border border-zinc-100 p-3"><span className={`mt-1 size-2 shrink-0 rounded-full ${i === 0 ? "bg-red-600" : "bg-zinc-300"}`}/><div><div className="text-xs font-black text-zinc-800">{n[0]}</div><div className="mt-1 text-xs leading-5 text-zinc-500">{n[1]}</div><div className="mt-1 text-[10px] text-zinc-400">{n[2]}</div></div></div>)}</div><Button variant="secondary" className="mt-4 w-full" onClick={() => setNotifications(false)}>علامت‌گذاری همه به‌عنوان خوانده‌شده</Button></Modal>}
    {support && <Modal title="پشتیبانی فنی" onClose={() => setSupport(false)}><div className="rounded-xl bg-zinc-950 p-5 text-white"><div className="text-sm font-black">مرکز پاسخ‌گویی AM</div><div className="mt-2 text-xs leading-6 text-zinc-400">شنبه تا پنج‌شنبه، ساعت ۸ تا ۱۸</div><div dir="ltr" className="mt-4 text-left text-xl font-black">021 9109 8840</div></div><div className="mt-4 grid grid-cols-2 gap-3"><Button variant="secondary" icon="phone" onClick={() => notify("درخواست تماس شما ثبت شد.")}>درخواست تماس</Button><Button icon="mail" onClick={() => { setSupport(false); notify("تیکت پشتیبانی با موفقیت ثبت شد."); }}>ثبت تیکت</Button></div></Modal>}
    {toast && <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-zinc-950 px-5 py-4 text-sm font-bold text-white shadow-2xl"><span className="grid size-6 place-items-center rounded-full bg-emerald-500"><Icon name="check" size={14}/></span>{toast}</div>}
  </div>;
}

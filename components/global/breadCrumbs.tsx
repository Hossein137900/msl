"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
const pathTranslations: { [key: string]: string } = {
  projects: "پروژه ها",
  about: "درباره ما",
  contact: "تماس با ما",
  blog: "وبلاگ",
  order: "سفارش",
  login: "ورود",
  register: "ثبت نام",
  aiServices: "خدمات هوش مصنوعی",
  blogs: "وبلاگ",
  store: "فروشگاه",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

    let label = segment;
    if (segment.includes(":")) {
      label = segment.split(":").pop() || segment;
    } else {
      label = pathTranslations[segment] || segment;
    }

    return { href, label };
  });

  return (
    <nav
      className="backdrop-blur-[2px] brightness-95 bg-white/5 py-3 px-6 rounded-lg absolute top-20 right-4 lg:right-9 z-10"
      dir="rtl"
    >
      <ol className="flex items-center space-x-2 space-x-reverse">
        <li>
          <Link
            href="/"
            className="text-blue-50 hover:text-stone-500 flex items-center"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronLeftIcon
              className="h-3 w-3
            
            text-gray-400 mx-2"
            />
            <Link
              href={item.href}
              className={`${
                index === breadcrumbItems.length - 1
                  ? "text-gray-300 hover:text-gray-300 font-medium text-xs lg:text-sm "
                  : "text-blue-600 hover:text-blue-800 text-xs lg:text-sm"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

"use client";
import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
  cart: "سبد خرید",
  dashboard: "داشبورد",
  admin: "مدیریت",
};

const BreadcrumbsContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments
    .map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      let label = pathTranslations[segment] || segment;

      // Special handling for blog routes
      if (segment === "blogs") {
        return { href, label, isBlogs: true };
      }

      if (segment.includes(":")) {
        const [, slug] = segment.split(":");
        label = slug;
        return { href, label, isBlogs: false };
      }

      if (segment === "store" && searchParams.get("category")) {
        return [
          { href, label, isBlogs: false },
          {
            href: `${href}?category=${searchParams.get("category")}`,
            label: searchParams.get("category"),
            isBlogs: false,
          },
        ];
      }

      return { href, label, isBlogs: false };
    })
    .flat();

  return (
    <nav
      className="backdrop-blur-[2px]  py-1 px-6  rounded-lg absolute top-20 right-4 lg:right-9 z-10"
      dir="rtl"
    >
      <ol className="flex items-center  space-x-2 space-x-reverse">
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
            <ChevronLeftIcon className="h-3 w-3 text-gray-400 mx-2" />
            <Link
              href={item.href}
              target={item.isBlogs ? "_blank" : "_self"}
              className={`${
                index === breadcrumbItems.length - 1
                  ? "text-gray-200 hover:text-gray-300 font-medium text-xs lg:text-sm"
                  : "text-gray-300 hover:text-gray-600 text-xs lg:text-sm"
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
const Breadcrumbs = () => {
  return (
    <Suspense
      fallback={
        <div className="backdrop-blur-[2px] py-1 px-6 rounded-lg absolute top-20 right-4 lg:right-9 z-10">
          Loading...
        </div>
      }
    >
      <BreadcrumbsContent />
    </Suspense>
  );
};

export default Breadcrumbs;

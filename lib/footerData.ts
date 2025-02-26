import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaLinkedin, FaTelegram } from "react-icons/fa";

export const socialLinks = [
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "Twitter", href: "#", icon: FaTwitter },
  { name: "LinkedIn", href: "#", icon: FaLinkedin },
  { name: "Telegram", href: "#", icon: FaTelegram },
];

export const quickLinks = [
  { name: "صفحه اصلی", href: "/" },
  { name: "محصولات", href: "/products" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
  { name: "بلاگ", href: "/blog" },
];

export const contactInfo = [
  {
    label: "شماره تماس",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    icon: FaPhone,
  },
  {
    label: "ایمیل",
    value: "info@msl-chandeliers.com",
    icon: FaEnvelope,
  },
  {
    label: "آدرس",
    value: "تهران، خیابان ولیعصر، پاساژ نور",
    icon: FaMapMarkerAlt,
  },
];

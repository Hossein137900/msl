import Image from "next/image";
import moment from "moment-jalaali";

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: Date;
  readTime: number;
  image: string;
  tags: string[];
}

// const sampleBlogPost: BlogPost = {
//   title: "آینده توسعه وب در سال 1403",
//   content: `
//     <h2>تکامل وب مدرن</h2>
//     <p>چشم‌انداز توسعه وب به سرعت در حال تکامل است. با ظهور فریم‌ورک‌ها و ابزارهای جدید هر روز، توسعه‌دهندگان باید جلوتر از منحنی باشند.</p>
//     <h3>روندهای کلیدی</h3>
//     <ul>
//       <li>توسعه مبتنی بر هوش مصنوعی</li>
//       <li>انقلاب WebAssembly</li>
//       <li>رایانش لبه</li>
//     </ul>
//     <blockquote>نوآوری فقط ایجاد چیز جدید نیست، بلکه ایجاد چیزی ارزشمند است.</blockquote>
//   `,
//   author: "سارا جانسون",
//   date: new Date(),
//   readTime: 5,
//   image: "/assets/images/fade3.jpg",
//   tags: ["توسعه وب", "تکنولوژی", "هوش مصنوعی", "آینده"],
// };

export default function BlogPost(blogPostData: BlogPost) {
  const sampleBlogPost = blogPostData;
  const persianDate = moment(sampleBlogPost.date)
    .format("jDD jMMMM jYYYY")
    .replace(
      /[0-9]/g,
      (digit: string) =>
        ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(digit)]
    )
    .replace("Farvardin", "فروردین")
    .replace("Ordibehesht", "اردیبهشت")
    .replace("Khordad", "خرداد")
    .replace("Tir", "تیر")
    .replace("Mordad", "مرداد")
    .replace("Shahrivar", "شهریور")
    .replace("Mehr", "مهر")
    .replace("Aban", "آبان")
    .replace("Azar", "آذر")
    .replace("Dey", "دی")
    .replace("Bahman", "بهمن")
    .replace("Esfand", "اسفند");

  return (
    <article className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <div className="relative h-[400px] mb-8 rounded-2xl overflow-hidden">
        <Image
          src="/assets/images/fade3.jpg"
          alt={sampleBlogPost.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{sampleBlogPost.title}</h1>
        <div className="flex items-center gap-4 text-gray-300">
          <span>{persianDate}</span>
          <span>•</span>
          <span>{sampleBlogPost.readTime} دقیقه مطالعه</span>
          <span>•</span>
          <span>نویسنده: {sampleBlogPost.author}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {sampleBlogPost.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-yellow-400 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: sampleBlogPost.content }}
      />
    </article>
  );
}

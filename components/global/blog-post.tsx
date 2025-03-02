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
    <article
      className="px-4 py-8 bg-gradient-to-l from-[#16222A] to-[#3A6073]"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto mt-24">
        <div className="relative h-[300px] md:h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src="/assets/images/fade3.jpg"
            alt={sampleBlogPost.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mb-4">
          <h1 className="md:text-4xl text-2xl font-bold mb-2">
            {sampleBlogPost.title}
          </h1>
          <div className="flex text-nowrap items-center gap-4 text-gray-300">
            <span className="text-sm md:text-md">{persianDate}</span>
            <span>•</span>
            <span className="text-sm md:text-md">
              {sampleBlogPost.readTime} دقیقه مطالعه
            </span>
            <span>•</span>
            <span className="text-sm md:text-md">
              نویسنده: {sampleBlogPost.author}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {sampleBlogPost.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-yellow-400 text-gray-700 px-3 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          className="text-gray-300 text-sm md:text-xl"
          dangerouslySetInnerHTML={{ __html: sampleBlogPost.content }}
        />
      </div>
    </article>
  );
}

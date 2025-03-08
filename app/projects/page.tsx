"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "پروژه 1",
      location: "تهران ، فرشته",
      description:
        " در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.",
      imageUrl: "/assets/images/projects/project1.png",
    },
    {
      id: 2,
      title: "پروژه 2",
      location: "تهران ، فرشته",

      description:
        " در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.",
      imageUrl: "/assets/images/projects/project2.jpg",
    },
    {
      id: 3,
      title: "پروژه 2",
      location: "تهران ، فرشته",

      description:
        " در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.",
      imageUrl: "/assets/images/projects/project3.jpg",
    },
    {
      id: 4,
      title: "پروژه 2",
      location: "تهران ، فرشته",

      description:
        " در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.",
      imageUrl: "/assets/images/projects/project4.jpg",
    },
  ];

  return (
    <div className="min-h-screen" dir="rtl">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[100vh] relative mb-36 overflow-hidden"
      >
        <Image
          src="/assets/images/projects/project5.jpg"
          alt="Chandelier Craftsmanship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center text-white"
          >
            افتخارات همکاری
          </motion.h1>

          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-gray-300 text-center text-lg mt-4"
          >
            سابقه همکاری با مشتریان ما
          </motion.p>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 mb-16 mx-16 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer rounded-lg border border-[#a37462]/30 hover:shadow-xl hover:border-[#a37462] transition-all duration-200 ease-in-out overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={4000}
              height={4000}
              className="w-full h-64 object-cover"
            />
            <motion.div className="p-4 flex flex-row justify-between bg-white">
              <div>
                <h2 className="text-xl font-bold text-black">
                  {project.title}
                </h2>
                <p className="text-xs mt-4 mr-11 w-full text-black text-justify">
                  {project.description}
                </p>
                <button className="border border-[#a37462] bg-[#a37462]/10 w-full mr-11 mt-4 text-[#a37462] px-4 py-2 rounded-lg">
                  مشاهده
                </button>
              </div>

              <div className="flex border border-[#a37462] bg-[#a37462]/10 w-fit h-fit rounded-lg p-2 flex-row-reverse text-xs text-nowrap items-start">
                <FaMapMarkerAlt size={12} className="text-[#a37462] pr-1" />
                <p className="text-[#a37462]">
                  {project.location ? project.location : "مکان مشخص نشده"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="fixed inset-1 md:inset-20 z-50 rounded-lg overflow-hidden"
            >
              <div className="relative h-full">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-contain md:object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-44 md:top-4 right-4 text-white bg-white/20 backdrop-blur-sm rounded-lg p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
                <div className="absolute bottom-0 w-full p-4 bg-transparent/5 text-[#a37462]">
                  <h2 className="text-2xl font-bold">
                    {selectedProject.title}
                  </h2>
                  <p>{selectedProject.description}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;

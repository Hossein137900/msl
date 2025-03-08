"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "پروژه 1",
      description: "توضیحات پروژه 1",
      imageUrl: "/assets/images/fade3.jpg",
    },
    {
      id: 2,
      title: "پروژه 2",
      description: "توضیحات پروژه 2",
      imageUrl: "/assets/images/fade4.jpg",
    },
    {
      id: 3,
      title: "پروژه 2",
      description: "توضیحات پروژه 2",
      imageUrl: "/assets/images/fade2.jpg",
    },
    {
      id: 4,
      title: "پروژه 2",
      description: "توضیحات پروژه 2",
      imageUrl: "/assets/images/fade1.jpg",
    },
    // Add more projects as needed
  ];

  return (
    <div className="min-h-screen mt-24 p-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <motion.div className="p-4 bg-transparent/5 text-[#a37462]">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
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

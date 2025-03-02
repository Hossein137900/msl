"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { addBlog } from "@/lib/action";



const MenuButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md transition-colors ${
      active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"
    }`}
  >
    {children}
  </button>
);

const ColorPickerDropdown = ({
  isOpen,
  onClose,
  onColorSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
}) => {
  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 p-2 bg-white rounded-lg shadow-xl border z-50 w-48">
      <div className="grid grid-cols-10 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            onClick={() => {
              onColorSelect(color);
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tags.length >= 3) {
      toast.warning('شما فقط می‌توانید ۳ برچسب اضافه کنید');
      return;
    }
    
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            dir: "auto",
          },
        },
        bulletList: false,
        orderedList: false,
      }),
      BulletList.configure({
        keepMarks: true,
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        keepMarks: true,
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline hover:text-blue-700",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[200px] rtl",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words: string[] = text
        .trim()
        .split(/\s+/)
        .filter((word: string) => word !== "");
      setWordCount(words.length);
    },
  });

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor?.chain().focus().setLink({ href: url }).run();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("seoTitle", seoTitle);
    formData.append("content", editor?.getHTML() || "");
    formData.append("userId", "3d1ad2d5-04a1-4b31-b92a-0c46c75e2953");
    formData.append("image", "default-image.jpg");
    formData.append("tags", JSON.stringify(tags));
    formData.append("readTime", "5");

    try {
      await addBlog(formData);
      toast.success("بلاگ با موفقیت ایجاد شد");
      setTitle("");
      setDescription("");
      setSeoTitle("");
      editor?.commands.clearContent();
    } catch (error) {
      console.error(error);
      toast.error("خطا در ایجاد بلاگ");
    }
  };

  return (
    <div className="max-w-4xl mx-6 md:mt-36 my-16 lg:mx-auto">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
      >
        افزودن بلاگ جدید
      </motion.h2>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
            placeholder="عنوان سئو"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border mt-4"
            placeholder="توضیحات کوتاه"
          />
          <div className="space-y-4 mt-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="w-full px-4 py-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="برچسب‌ها را وارد کنید..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="hover:text-red-500 transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border"
          placeholder="عنوان بلاگ"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-2">
            محتوای بلاگ
          </label>
          <div className="border border-gray-300 rounded-lg">
            <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap gap-2">
              <MenuButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive("bold")}
              >
                <i className="fas fa-bold"></i>
              </MenuButton>

              <MenuButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive("italic")}
              >
                <i className="fas fa-italic"></i>
              </MenuButton>

              <MenuButton onClick={setLink} active={editor?.isActive("link")}>
                <i className="fas fa-link"></i>
              </MenuButton>

              <MenuButton
                onClick={() => editor?.chain().focus().unsetLink().run()}
                active={false}
              >
                <i className="fas fa-unlink"></i>
              </MenuButton>

              {[1, 2, 3, 4, 5].map((level) => (
                <MenuButton
                  key={level}
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 })
                      .run()
                  }
                  active={editor?.isActive("heading", { level })}
                >
                  H{level}
                </MenuButton>
              ))}

              <div className="relative">
                <MenuButton
                  onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                  active={showTextColorPicker}
                >
                  <i className="fas fa-font"></i>
                </MenuButton>
                <ColorPickerDropdown
                  isOpen={showTextColorPicker}
                  onClose={() => setShowTextColorPicker(false)}
                  onColorSelect={(color) =>
                    editor?.chain().focus().setColor(color).run()
                  }
                />
              </div>

              <div className="relative">
                <MenuButton
                  onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                  active={showBgColorPicker}
                >
                  <i className="fas fa-fill-drip"></i>
                </MenuButton>
                <ColorPickerDropdown
                  isOpen={showBgColorPicker}
                  onClose={() => setShowBgColorPicker(false)}
                  onColorSelect={(color) =>
                    editor?.chain().focus().setHighlight({ color }).run()
                  }
                />
              </div>

              <MenuButton
                onClick={() =>
                  editor?.chain().focus().setTextAlign("left").run()
                }
                active={editor?.isActive({ textAlign: "left" })}
              >
                <i className="fas fa-align-left"></i>
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor?.chain().focus().setTextAlign("center").run()
                }
                active={editor?.isActive({ textAlign: "center" })}
              >
                <i className="fas fa-align-center"></i>
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor?.chain().focus().setTextAlign("right").run()
                }
                active={editor?.isActive({ textAlign: "right" })}
              >
                <i className="fas fa-align-right"></i>
              </MenuButton>

              <MenuButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive("bulletList")}
              >
                <i className="fas fa-list-ul"></i>
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                active={editor?.isActive("orderedList")}
              >
                <i className="fas fa-list-ol"></i>
              </MenuButton>
            </div>

            <div className="p-4 bg-white">
              <EditorContent editor={editor} />
            </div>

            <div className="mt-2 text-sm text-gray-500 text-right border-t p-2">
              تعداد کلمات: {wordCount}
            </div>
          </div>
        </div>

        <div className="text-right pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            انتشار بلاگ
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" rtl={true} />
    </div>
  );
}
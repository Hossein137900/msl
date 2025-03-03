import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CardProps {
  title: string;
  icon: React.ComponentType<{ className: string }>;
  description: string;
}
const CardWithMouseBorder = ({
  card,
  index,
}: {
  card: CardProps;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const distance = 50; // Detection distance in pixels

      // Calculate distance from mouse to card edges
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;

      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanceFromCenter < rect.width / 2 + distance) {
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.classList.add("near-mouse");
      } else {
        card.classList.remove("near-mouse");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="card-wrapper"
    >
      <div className="card-content">
        <div className="icon-container">
          <card.icon className="w-12 h-12 text-[#a37462]/80" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{card.title}</h3>
        <p className="text-stone-800">{card.description}</p>
      </div>
    </motion.div>
  );
};
export default CardWithMouseBorder;

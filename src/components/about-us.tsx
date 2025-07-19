"use client";

import { useState } from "react";
import { motion, easeInOut } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  PenTool,
  MessageCircle,
  Target,
  Scale,
  Users,
  Award,
} from "lucide-react";

const cards = [
  {
    icon: <Search size={32} />,
    title: "Patentability Search",
    description:
      "Discover if your invention is novel and non-obvious before applying.",
  },
  {
    icon: <FileText size={32} />,
    title: "Patent Drafting",
    description:
      "Get professionally drafted patent applications ready for filing.",
  },
  {
    icon: <PenTool size={32} />,
    title: "Patent Filing",
    description:
      "File your patent in India or internationally with expert guidance.",
  },
  {
    icon: <MessageCircle size={32} />,
    title: "Office Action Response",
    description:
      "Expert help in responding to objections raised by the patent office.",
  },
  {
    icon: <Target size={32} />,
    title: "Patent Prosecution",
    description:
      "Strategic follow-through from filing to grant of the patent.",
  },
  {
    icon: <Scale size={32} />,
    title: "Patent Litigation",
    description:
      "Enforce your patent rights or defend against infringement claims.",
  },
  {
    icon: <Users size={32} />,
    title: "IP Commercialization",
    description:
      "Monetize your IP through licensing, sales, or tech transfer.",
  },
  {
    icon: <Award size={32} />,
    title: "Patent Portfolio Management",
    description:
      "End-to-end management of your IP assets for maximum value.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut, // ✅ Type-safe easing value
    },
  },
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const maxIndex = Math.ceil(cards.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleCards = cards.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Our Patent Services
      </h1>

      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          disabled={currentIndex === 0}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight />
        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-12">
          {visibleCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <div className="text-indigo-600 mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

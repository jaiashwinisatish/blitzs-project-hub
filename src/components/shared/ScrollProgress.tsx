import { motion } from 'framer-motion';

interface ScrollProgressProps {
  scrollProgress: number;
}

export const ScrollProgress = ({ scrollProgress }: ScrollProgressProps) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
      style={{ scaleX: scrollProgress, originX: 0 }}
    />
  );
};

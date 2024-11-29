"use client";

import { motion } from "framer-motion";

const MotionDiv = ({
  children,
  className,
  initial,
  animate,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: { opacity: number; y: number };
  animate?: { opacity: number; y: number; transition: { duration: number } };
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      className={`${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;

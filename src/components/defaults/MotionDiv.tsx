"use client";

import { motion } from "framer-motion";

const MotionDiv = ({
  children,
  className,
  initial,
  whileInView,
  animate,
  exit,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  exit?: any;
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      animate={animate}
      className={`${className || ""}`}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;

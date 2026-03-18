import { motion } from "framer-motion";

export const PageSection = ({ children, className = "", testId }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
      data-testid={testId}
    >
      {children}
    </motion.section>
  );
};
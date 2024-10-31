import { motion } from 'framer-motion';

function FadeAndScaleIn({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.7 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeAndScaleIn;

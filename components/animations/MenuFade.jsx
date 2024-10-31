import { motion } from 'framer-motion';

function MenuFade({ children, isOpen }) {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      exit="closed"
      // whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default MenuFade;

import { motion } from 'framer-motion';

function SlideFromRight({ children }) {
  return (
    <motion.div
      className="my-3" // Needed for the desktop menu, would be reusuable if we could pass in the class names as props
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 100 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default SlideFromRight;

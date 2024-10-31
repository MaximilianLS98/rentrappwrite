import { motion } from 'framer-motion';

function FadeInHorizontally({ children, direction }) {
  // If direction is not passed in, default would be to slide in from the left
  direction === 'right' ? (direction = 100) : (direction = -100);
  return (
    <div className="overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: direction },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default FadeInHorizontally;

import { motion } from 'framer-motion';

function UpAndDown({ children }) {
  const transition = {
    y: {
      duration: 5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeOut',
    },
  };
  return (
    <motion.div
      transition={transition}
      animate={{
        y: ['1%', '-1%'],
      }}
    >
      {children}
    </motion.div>
  );
}

export default UpAndDown;

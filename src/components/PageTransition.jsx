import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 24,
    filter: 'blur(8px)',
    scale: 0.98,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.08,
    }
  },
  exit: { 
    opacity: 0, 
    y: -16,
    filter: 'blur(6px)',
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const childVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
};

export function PageTransition({ children, className = '', style = {} }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInView({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '', stagger = 0.08 }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: stagger, delayChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 16, scale: 0.97 },
        animate: { 
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, className = '', scale = 1.02 }) {
  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        scale,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

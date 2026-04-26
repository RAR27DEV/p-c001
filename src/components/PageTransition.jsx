import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(6px)',
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const childVariants = {
  initial: { opacity: 0, y: 25, filter: 'blur(4px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
};

export function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      variants={childVariants}
      className={className}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function FadeInView({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
        animate: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
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
        initial: { opacity: 0, y: 20, scale: 0.97 },
        animate: { 
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
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
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

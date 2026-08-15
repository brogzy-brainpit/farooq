'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useInView } from 'framer-motion';

/* ---------------- SPLIT ---------------- */
function splitText(text, type) {
  if (type === 'character') return text.split('');
  if (type === 'line') return text.split('\n');
  return text.split(' ');
}

/* ---------------- COMPONENT ---------------- */
export default function TypographyReveal({
  children,
  className,

  revealType = 'word',
  animationType = 'fadeInUp',
  fromDirection = 'bottom',

  mutedColor = '#999',
  toColor = 'red',

  duration = 1,
  stagger = 0.04,
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false});
  // const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  const text = useMemo(
    () => React.Children.toArray(children).join(''),
    [children]
  );

  const items = useMemo(
    () => splitText(text, revealType),
    [text, revealType]
  );

  /* ---------------- INITIAL STATE ---------------- */
  const getInitial = () => {
    const base = {
      opacity: 0,
    };

    switch (animationType) {
      case 'blurIn':
        return { ...base, filter: 'blur(10px)' };

      case 'flipIn':
        return {
          ...base,
          rotateX: -90,
          transformOrigin: 'center bottom',
        };

      case 'fadeInUp':
      default:
        switch (fromDirection) {
          case 'left':
            return { ...base, x: -40 };
          case 'right':
            return { ...base, x: 40 };
          case 'top':
            return { ...base, y: -40 };
          default:
            return { ...base, y: 40 };
        }
    }
  };

  return (
    <p
      ref={ref}
      className={clsx(
        'text-left',
        animationType === 'flipIn' && '[perspective:800px]',
        className
      )}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={getInitial()}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  color: toColor,
                }
              : {}
          }
          transition={{
            duration,
            delay: i * stagger,
            ease: [0.25, 1, 0.5, 1],
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {revealType === 'word' && i !== items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
}
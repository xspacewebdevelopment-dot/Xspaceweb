'use client';

import { motion, TargetAndTransition } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type AnimationValue = Record<string, string | number>;

const buildKeyframes = (from: AnimationValue, steps: AnimationValue[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, (string | number)[]> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])].filter((v): v is string | number => v !== undefined);
  });
  return keyframes;
};

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationValue;
  animationTo?: AnimationValue[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  /** Render as a specific HTML element. Defaults to 'p'. */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = 'p',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Check viewport width without triggering cascading state re-renders on mount
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const defaultFrom = useMemo<AnimationValue>(() => {
    if (isMobile) {
      return { opacity: 0, y: direction === 'top' ? -15 : 15, filter: 'blur(0px)' };
    }
    return {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -35 : 35,
    };
  }, [direction, isMobile]);

  const defaultTo = useMemo<AnimationValue[]>(() => {
    if (isMobile) {
      return [{ opacity: 1, y: 0, filter: 'blur(0px)' }];
    }
    return [
      {
        filter: 'blur(4px)',
        opacity: 0.6,
        y: direction === 'top' ? 4 : -4,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ];
  }, [direction, isMobile]);

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Use motion with the specified tag
  const MotionTag = motion[as] as typeof motion.p;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-transform"
            key={index}
            initial={fromSnapshot as TargetAndTransition}
            animate={(inView ? animateKeyframes : fromSnapshot) as TargetAndTransition}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </MotionTag>
  );
};

export default BlurText;

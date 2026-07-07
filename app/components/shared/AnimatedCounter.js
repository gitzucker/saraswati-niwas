"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import styles from "./AnimatedCounter.module.css";

export default function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = ""
}) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, triggerOnce: true });
  const count = useAnimatedCounter(end, duration, isVisible);

  return (
    <span ref={ref} className={`${styles.counter} ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

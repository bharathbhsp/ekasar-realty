"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SITE_STATS } from "@/lib/data";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number | string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || typeof value === "string") return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, value]);

  if (typeof value === "string") {
    return (
      <span ref={ref} className="text-4xl sm:text-5xl font-bold text-gold">
        {started ? value : "0"}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-gold">
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Projects Delivered", value: SITE_STATS.projectsDelivered },
  { label: "Years of Experience", value: SITE_STATS.yearsExperience, suffix: "+" },
  { label: "SFT Developed", value: SITE_STATS.sftDeveloped },
  { label: "SFT Under Development", value: SITE_STATS.sftUnderDevelopment },
];

export function Stats() {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            The Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Proven, project after project
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Home,
  Award,
  Clock,
  Leaf,
} from "lucide-react";
import { PILLARS } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-7 h-7" />,
  trending: <TrendingUp className="w-7 h-7" />,
  home: <Home className="w-7 h-7" />,
  award: <Award className="w-7 h-7" />,
  clock: <Clock className="w-7 h-7" />,
  leaf: <Leaf className="w-7 h-7" />,
};

export function Pillars() {
  return (
    <section id="promise" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            The Ekasar Promise
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Every decision has a rigorous reason
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/5 text-navy flex items-center justify-center mb-5">
                {iconMap[pillar.icon]}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3">{pillar.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

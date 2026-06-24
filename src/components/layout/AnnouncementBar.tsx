"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed) setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-navy text-white text-sm py-2.5 px-4 text-center relative">
      <span className="font-medium">Coming Soon:</span> New launch at Hebbal —
      <Link href="/projects/ekasar-horizon" className="underline ml-1 hover:text-gold transition-colors">
        Register your interest
      </Link>
      <button
        onClick={() => {
          sessionStorage.setItem("announcement-dismissed", "1");
          setVisible(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-gold transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

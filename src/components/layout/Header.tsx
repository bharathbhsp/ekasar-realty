"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#promise", label: "The Promise" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = scrolled || !isHome
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-navy" : "text-white";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        headerBg
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "text-xl lg:text-2xl font-bold tracking-tight transition-colors",
                textColor
              )}
            >
              Ekasar<span className="text-gold">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-gold transition-colors",
                  textColor
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-colors",
                    scrolled || !isHome
                      ? "border-navy/20 text-navy hover:border-gold"
                      : "border-white/30 text-white hover:border-gold hover:text-gold"
                  )}
                >
                  <User className="w-4 h-4" />
                  {session.user?.name?.split(" ")[0]}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-gray-50"
                      onClick={() => setAccountOpen(false)}
                    >
                      <User className="w-4 h-4" /> Account
                    </Link>
                    {(session.user?.role === "EDITOR" ||
                      session.user?.role === "ADMIN") && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-gray-50"
                        onClick={() => setAccountOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={cn(
                    "text-sm font-medium hover:text-gold transition-colors",
                    textColor
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-semibold bg-gold text-navy px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className={cn("lg:hidden p-2", textColor)}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-navy font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {session ? (
              <>
                <Link href="/account" className="py-2 text-navy" onClick={() => setMobileOpen(false)}>
                  Account
                </Link>
                {(session.user?.role === "EDITOR" || session.user?.role === "ADMIN") && (
                  <Link href="/admin" className="py-2 text-navy" onClick={() => setMobileOpen(false)}>
                    Admin
                  </Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="py-2 text-red-600 text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in" className="py-2 text-navy" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="py-2 text-center bg-gold text-navy rounded-full font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

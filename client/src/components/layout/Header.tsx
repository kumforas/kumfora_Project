"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, Search, User, Heart, LogOut } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export function Header({ isPromoHidden }: { isPromoHidden: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navItems = [
    { label: "Shop", href: "/shop" },
    { label: "Our Story", href: "/about" },
    { label: "Period Guide", href: "/guide" },
    { label: "FAQs", href: "/faqs" },
    { label: "Feedback", href: "/feedback" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/shop?q=${encodeURIComponent(q)}`);
      setIsSearchOpen(false);
    } else {
      router.push("/shop");
    }
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white border-b border-kumfora-rose/10 shadow-sm"
          : "bg-white/95",
        isPromoHidden ? "top-0" : "top-10",
      )}
    >
      <nav className="container-main" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Kumfora Home"
          >
            <Image src="/logo.png" alt="Kumfora" width={160} height={60} />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-body-sm font-semibold text-kumfora-slate hover:text-kumfora-hotPink transition-colors rounded-xl hover:bg-kumfora-blush/30"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative" role="search">
              <label htmlFor="desktop-search" className="sr-only">
                Search products
              </label>
              <input
                id="desktop-search"
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pads, guides, FAQs..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-kumfora-cream border border-kumfora-lightGray text-body-sm text-kumfora-charcoal placeholder:text-kumfora-gray focus:outline-none focus:ring-2 focus:ring-kumfora-hotPink/30 focus:border-kumfora-hotPink transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-kumfora-gray" />
            </form>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden btn-ghost p-3"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              className="tooltip-wrapper btn-ghost p-3"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="tooltip">Wishlist</span>
            </Link>
            {user ? (
              <div className="relative group">
                <Link
                  href="/account"
                  className="tooltip-wrapper btn-ghost p-3 flex items-center gap-1"
                  aria-label="My Account"
                >
                  <User className="w-5 h-5" />
                  <span className="text-body-sm font-medium hidden lg:inline max-w-[80px] truncate">
                    {user.user_metadata?.first_name || user.email?.split('@')[0]}
                  </span>
                </Link>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-kumfora-lightGray p-2 min-w-[160px]">
                    <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-body-sm text-kumfora-charcoal hover:bg-kumfora-blush rounded-lg transition-colors">
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 px-3 py-2 text-body-sm text-kumfora-rose hover:bg-kumfora-rose/10 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="tooltip-wrapper btn-ghost p-3"
                aria-label="Sign In"
              >
                <User className="w-5 h-5" />
                <span className="tooltip">Sign In</span>
              </Link>
            )}
            <button
              onClick={openCart}
              className="tooltip-wrapper relative btn-ghost p-3"
              aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : ""}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-kumfora-hotPink text-white text-caption font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
              <span className="tooltip">Cart</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden btn-ghost p-3"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-kumfora-rose/10">
            <form onSubmit={handleSearch} className="relative" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pads, guides, FAQs..."
                className="input pl-12 pr-12"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kumfora-gray" />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-kumfora-gray hover:text-kumfora-hotPink transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex h-20 items-center justify-between px-6 border-b border-kumfora-rose/10">
              <span className="text-xl font-bold text-kumfora-charcoal">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="btn-ghost p-3"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 py-6 px-6 overflow-y-auto">
              <ul className="space-y-2" role="list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-5 py-4 rounded-2xl text-body font-semibold text-kumfora-slate hover:bg-kumfora-blush/50 hover:text-kumfora-hotPink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-kumfora-rose/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-body font-semibold text-kumfora-slate hover:bg-kumfora-blush/50 hover:text-kumfora-hotPink transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-kumfora-blush flex items-center justify-center">
                        <User className="w-5 h-5 text-kumfora-hotPink" />
                      </div>
                      {user.user_metadata?.first_name || 'My Account'}
                    </Link>
                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-body font-semibold text-kumfora-rose hover:bg-kumfora-rose/10 transition-colors w-full text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-kumfora-rose/10 flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-kumfora-rose" />
                      </div>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-body font-semibold text-kumfora-slate hover:bg-kumfora-blush/50 hover:text-kumfora-hotPink transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-kumfora-blush flex items-center justify-center">
                      <User className="w-5 h-5 text-kumfora-hotPink" />
                    </div>
                    Sign In
                  </Link>
                )}
                <Link
                  href="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl text-body font-semibold text-kumfora-slate hover:bg-kumfora-blush/50 hover:text-kumfora-hotPink transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-kumfora-blush flex items-center justify-center">
                    <Heart className="w-5 h-5 text-kumfora-hotPink" />
                  </div>
                  Wishlist
                </Link>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}

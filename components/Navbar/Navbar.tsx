"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/Auth/AuthModal";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

const UserMenu = dynamic(() => import("./UserMenu"), { ssr: false });

export function NavbarTop() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const supabase = createClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setIsAuthenticated(!!user);
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthenticated(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const handleCoursesClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const coursesSection = document.querySelector('section[id="courses"]');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { name: "Courses", link: "/courses", onClick: isHomePage ? handleCoursesClick : undefined },
    { name: "Webinars", link: "/webinars" },
    { name: "Academy", link: "/academy" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <div className="relative w-full">
      <Navbar className="">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="text-blue-900" />
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <button
                  onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
                  className="text-blue-700 hover:text-blue-800 transition-colors font-medium text-sm cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); }}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-sm cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-blue-50">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} className="bg-blue-100/95 backdrop-blur-sm">
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => { if (item.onClick) item.onClick(e); setIsMobileMenuOpen(false); }}
                className="block py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href="/academy/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-blue-700 hover:text-blue-800 transition-colors font-medium text-center py-2.5 px-4"
                >
                  Dashboard
                </Link>
                <form action="/auth/logout" method="post" className="w-full">
                  <button
                    type="submit"
                    className="block w-full text-red-600 hover:bg-red-50 transition-colors font-medium text-center py-2.5 px-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="block w-full text-blue-700 hover:text-blue-800 transition-colors font-medium text-center py-2.5 px-4 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="block w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authModalMode} />
    </div>
  );
}


"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted) setIsAuthenticated(!!user);
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setIsAuthenticated(!!session?.user);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
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
    {
      name: "Courses",
      link: "/courses",
      onClick: isHomePage ? handleCoursesClick : undefined,
    },
    {
      name: "Webinars",
      link: "/webinars",
    },
    {
      name: "Academy",
      link: "/academy",
    },
    {
      name: "Solutions",
      children: [
        { name: "Mock Interviews", link: "/mock-interviews" },
        { name: "Blog", link: "/blog" },
      ],
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar className="">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            className="text-blue-900"
          />
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
                <Link href="/webinars/python-for-devops-2026" style={{ cursor: 'pointer', zIndex: 1000 }}>
                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-800 transition-colors font-medium text-sm"
                  >
                    Register for Webinar
                  </button>
                </Link>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-blue-50">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            className="bg-blue-100/95 backdrop-blur-sm"
          >
            <div className="w-full">
              {navItems.map((item, idx) => {
                const hasChildren = Array.isArray((item as any).children) && (item as any).children.length > 0;
                if (!hasChildren) {
                  return (
                    <a
                      key={`mobile-link-${idx}`}
                      href={(item as any).link}
                      onClick={(e) => {
                        if ((item as any).onClick) {
                          (item as any).onClick(e);
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="block py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
                    >
                      {item.name}
                    </a>
                  );
                }
                const children = (item as any).children as { name: string; link: string }[];
                return (
                  <div key={`mobile-acc-${idx}`} className="w-full">
                    <button
                      className="w-full flex items-center justify-between py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                      <span>{item.name}</span>
                      <span className={`transition-transform duration-200 ${openIdx === idx ? "rotate-180" : "rotate-0"}`}>{'\u25BE'}</span>
                    </button>
                    {openIdx === idx && (
                      <div className="pl-2">
                        {children.map((child, cIdx) => (
                          <a
                            key={`mobile-sublink-${idx}-${cIdx}`}
                            href={child.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-4 text-base text-blue-900 hover:bg-[#E0EDFE] hover:text-[#1447E6] rounded-md"
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile auth section */}
              {isAuthenticated ? (
                <div className="pt-2 border-t border-blue-200 mt-2">
                  <Link
                    href="/academy/dashboard"
                    className="block py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <form action="/auth/logout" method="post">
                    <button
                      type="submit"
                      className="w-full text-left py-2.5 px-4 text-lg font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <div className="pt-2 border-t border-blue-200 mt-2 space-y-2">
                  <button
                    onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left py-2.5 px-4 text-lg font-medium text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
            <Link
              href="/webinars/python-for-devops-2026"
              className="block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register for Webinar
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}

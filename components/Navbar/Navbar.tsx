"use client";
import React from "react";
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
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavbarTop() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
      name: "Solutions",
      children: [
        { name: "Mock Interviews", link: "/mock-interviews" },
        { name: "Blog", link: "/blog" },
      ],
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
          {/* Register for Webinar Button (Desktop) */}
          <Link href="/webinars/terraform-azure-5day" style={{ cursor: 'pointer', zIndex: 1000 }}>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-800 transition-colors font-medium text-sm"
            >
              Register for Webinar
            </button>
          </Link>
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
                      <span className={`transition-transform duration-200 ${openIdx === idx ? "rotate-180" : "rotate-0"}`}>▾</span>
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
            </div>
            <Link
              href="/webinars/terraform-azure-5day"
              className="block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register for Webinar
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}


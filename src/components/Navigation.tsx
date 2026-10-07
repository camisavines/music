"use client";

import { useState, useEffect } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from "@carbon/react";
import { Music, Menu, Close } from "@carbon/icons-react";

const navLinks = [
  { href: "#events",    label: "Events" },
  { href: "#gallery",   label: "Gallery" },
  { href: "#playlists", label: "Playlists" },
  { href: "#quote",     label: "Pricing" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToBooking = () => {
    setSideNavOpen(false);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header
        aria-label="DJ NevaMisaBeat"
        className={scrolled ? "is-scrolled" : ""}
      >
        <SkipToContent />

        <HeaderName href="/" prefix="">
          <span className="nav-brand">
            <Music size={22} className="nav-brand__icon" />
            <span className="nav-brand__text">
              DJ Neva<span className="nav-brand__accent">Misa</span>Beat
            </span>
          </span>
        </HeaderName>

        <HeaderNavigation aria-label="DJ NevaMisaBeat navigation">
          {navLinks.map((link) => (
            <HeaderMenuItem key={link.href} href={link.href} style={{background: "transparent"}}>
              {link.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>

        <HeaderGlobalBar>
          <button
            onClick={scrollToBooking}
            className="nav-book-btn"
            aria-label="Book Now"
          >
            Book Now
          </button>

          <HeaderGlobalAction
            aria-label={sideNavOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setSideNavOpen(!sideNavOpen)}
            className="nav-mobile-trigger"
          >
            {sideNavOpen ? <Close size={20} /> : <Menu size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <SideNav
        aria-label="Side navigation"
        expanded={sideNavOpen}
        onOverlayClick={() => setSideNavOpen(false)}
        isPersistent={false}
      >
        <SideNavItems>
          {navLinks.map((link) => (
            <SideNavLink
              key={link.href}
              href={link.href}
              onClick={() => setSideNavOpen(false)}
            >
              {link.label}
            </SideNavLink>
          ))}
          <SideNavLink href="#booking" onClick={scrollToBooking}>
            Book Now
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    </>
  );
}

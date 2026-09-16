"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { SearchDialog } from "@/components/layout/search-dialog";
import { mainNav, primaryCta } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background/0"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="Coorbitz home" className="shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-sm",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <SearchDialog />
          <Button asChild className="ml-2 hidden h-9 px-4 lg:inline-flex">
            <Link href={primaryCta.href}>
              {primaryCta.label} <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[320px] flex-col gap-0 p-0 sm:max-w-sm">
              <SheetHeader className="border-b px-6 py-5 text-left">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4">
                <ol>
                  {mainNav.map((item, index) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-baseline gap-4 rounded-md px-4 py-3 font-heading text-xl font-semibold transition-colors hover:bg-muted",
                              active ? "text-primary" : "text-foreground"
                            )}
                          >
                            <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <div className="space-y-4 border-t px-6 py-5">
                <SheetClose asChild>
                  <Button asChild className="h-11 w-full text-base">
                    <Link href={primaryCta.href}>
                      {primaryCta.label} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <a href={`mailto:${siteConfig.email.contact}`} className="block font-mono text-sm text-muted-foreground">
                  {siteConfig.email.contact}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

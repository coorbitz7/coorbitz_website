"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { insights } from "@/data/insights";

type SearchResult = {
  title: string;
  description: string;
  href: string;
  group: string;
};

const searchIndex: SearchResult[] = [
  ...services.map((s) => ({
    title: s.title,
    description: s.shortDescription,
    href: `/services#${s.id}`,
    group: "Services",
  })),
  ...industries.map((i) => ({
    title: i.title,
    description: i.description,
    href: `/industries#${i.id}`,
    group: "Industries",
  })),
  ...insights.map((i) => ({
    title: i.title,
    description: i.excerpt,
    href: `/insights`,
    group: "Insights",
  })),
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search the site"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="size-[1.15rem]" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] max-w-lg translate-y-0 gap-0 p-0 sm:top-[20%]">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="sr-only">Search Coorbitz</DialogTitle>
            <Input
              autoFocus
              placeholder="Search services, industries, insights…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto p-2">
            {query.trim() && results.length === 0 && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
            {results.map((result) => (
              <Link
                key={`${result.group}-${result.title}`}
                href={result.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 hover:bg-accent"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {result.group}
                </p>
                <p className="font-medium">{result.title}</p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {result.description}
                </p>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

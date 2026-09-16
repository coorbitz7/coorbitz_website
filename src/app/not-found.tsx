import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page isn't here. The address may have changed, or the link you followed is out of date.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b py-20">
      <div aria-hidden className="grid-paper absolute inset-0" />
      <Container className="relative max-w-2xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The address may have changed, or the link you followed is out of date. The pages below
          cover most of what people come here for.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 px-6">
            <Link href="/">
              Back to the homepage <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-6">
            <Link href="/services">See our services</Link>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Or use the search in the navigation bar to find services, industries and work.
        </p>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <GradientBlob className="left-[-10%] top-[10%] size-96 bg-primary/30" />
      <GradientBlob className="right-[-10%] bottom-[10%] size-96 bg-secondary/30" />

      <Container className="relative text-center">
        <p className="text-gradient-brand text-7xl font-bold tracking-tight sm:text-8xl">404</p>
        <h1 className="mx-auto mt-4 max-w-lg text-balance text-2xl font-semibold sm:text-3xl">
          This page seems to have wandered off.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/">
              <Home className="size-4" /> Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/contact">
              Contact Us <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Search className="size-4" /> Tip: use the search icon in the navigation bar to find
          what you need.
        </p>
      </Container>
    </section>
  );
}

import { NetworkMark } from "@/components/shared/logo";

export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5" role="status" aria-label="Loading">
      <NetworkMark className="size-12 animate-pulse" />
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Loading</span>
    </div>
  );
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNewsletterNotification } from "@/lib/email";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().trim().email() });

export async function POST(request: Request) {
  if (isRateLimited(`newsletter:${getClientKey(request)}`)) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await sendNewsletterNotification(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}

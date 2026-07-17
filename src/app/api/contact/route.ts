import { NextResponse } from "next/server";
import { contactSchema, failsTimeTrap } from "@/lib/validations";
import { sendContactNotification, sendContactThankYou } from "@/lib/email";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientKey(request)}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const formRenderedAt = Number(body?.formRenderedAt) || 0;

  // Honeypot filled in, or submitted implausibly fast — silently accept to not tip off the bot.
  if (data.website || failsTimeTrap(formRenderedAt)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactNotification(data);
    await sendContactThankYou(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send your message right now. Please try again shortly or email us directly." },
      { status: 500 }
    );
  }
}

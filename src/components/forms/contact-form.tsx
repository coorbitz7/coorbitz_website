"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError, FieldGroup, FieldDescription } from "@/components/ui/field";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { FormSuccessCard } from "@/components/forms/form-success-card";
import { useAntiSpamGuard, turnstileEnabled } from "@/hooks/use-anti-spam-guard";
import { contactSchema, failsTimeTrap, type ContactFormValues } from "@/lib/validations";
import { projectTypeOptions, budgetOptions, timelineOptions } from "@/lib/form-options";
import { siteConfig } from "@/data/site";

// Maps a `?service=` query value (a service title) onto the closest project-type option.
function projectTypeForService(service: string): string | undefined {
  const value = service.toLowerCase();
  if (value.includes("agent") || value.includes("automation")) return projectTypeOptions[3];
  if (value.includes("machine") || value.includes("ai")) return projectTypeOptions[2];
  if (value.includes("web")) return projectTypeOptions[1];
  if (value.includes("data")) return projectTypeOptions[4];
  if (value.includes("digital")) return projectTypeOptions[5];
  if (value.includes("software")) return projectTypeOptions[0];
  return undefined;
}

const emptyValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  projectType: "",
  details: "",
  budget: "",
  timeline: "",
  website: "",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { turnstileToken, handleTurnstileVerify, handleTurnstileExpire, formRenderedAtRef } =
    useAntiSpamGuard();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    const service = searchParams.get("service");
    const industry = searchParams.get("industry");
    if (service) {
      const projectType = projectTypeForService(service);
      if (projectType) setValue("projectType", projectType);
      setValue("details", `We're interested in ${service}. `);
    }
    if (industry) {
      setValue("details", `We're a ${industry.toLowerCase()} business. `);
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: ContactFormValues) {
    // Honeypot filled in, or submitted implausibly fast — silently "succeed" without actually
    // sending, so bots aren't tipped off and don't burn the Formspree monthly submission quota.
    if (data.website || failsTimeTrap(formRenderedAtRef.current)) {
      setStatus("success");
      reset(emptyValues);
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      toast.error("Please complete the verification challenge before sending.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(siteConfig.formspree.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          project_type: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
          message: data.details,
          _replyto: data.email,
          _subject: `Project inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
          ...(turnstileToken ? { "cf-turnstile-response": turnstileToken } : {}),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const message = json?.errors?.map((e: { message: string }) => e.message).join(", ");
        throw new Error(message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset(emptyValues);
    } catch (error) {
      setStatus("idle");
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessCard
        title="Thanks — we've got it."
        description="A person will read this and reply within two business days, usually with a few questions."
        buttonLabel="Send another message"
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    <form
      // react-hook-form's handleSubmit() only invokes onSubmit on the browser's submit event,
      // never during render, so onSubmit reading formRenderedAtRef here is safe despite the lint check.
      // eslint-disable-next-line react-hooks/refs
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-lg border bg-card p-6 sm:p-8"
    >
      <HoneypotField {...register("website")} />

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <Input id="contact-name" autoComplete="name" placeholder="Your name" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.company}>
            <FieldLabel htmlFor="contact-company">
              Company <span className="font-normal text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input id="contact-company" autoComplete="organization" placeholder="Company name" {...register("company")} />
            <FieldError errors={[errors.company]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
          <Input id="contact-email" type="email" autoComplete="email" placeholder="you@company.com" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.projectType}>
          <FieldLabel htmlFor="contact-project-type">What kind of project is it?</FieldLabel>
          <Controller
            control={control}
            name="projectType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="contact-project-type" className="w-full">
                  <SelectValue placeholder="Pick the closest fit" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.projectType]} />
        </Field>

        <Field data-invalid={!!errors.details}>
          <FieldLabel htmlFor="contact-details">What are you trying to build or fix?</FieldLabel>
          <Textarea
            id="contact-details"
            rows={6}
            placeholder="What's slow, manual or broken today? What would “better” look like? Anything about systems you already use helps."
            {...register("details")}
          />
          <FieldDescription>A couple of sentences is plenty. We’ll ask the rest.</FieldDescription>
          <FieldError errors={[errors.details]} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.budget}>
            <FieldLabel htmlFor="contact-budget">
              Budget <span className="font-normal text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-budget" className="w-full">
                    <SelectValue placeholder="If you have a range in mind" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.budget]} />
          </Field>
          <Field data-invalid={!!errors.timeline}>
            <FieldLabel htmlFor="contact-timeline">
              Timeline <span className="font-normal text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Controller
              control={control}
              name="timeline"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-timeline" className="w-full">
                    <SelectValue placeholder="When do you need it?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.timeline]} />
          </Field>
        </div>

        <TurnstileWidget onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" className="h-11 px-6" disabled={status === "loading"}>
            <AnimatePresence mode="wait" initial={false}>
              {status === "loading" ? (
                <motion.span key="loading" className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Sending…
                </motion.span>
              ) : (
                <motion.span key="idle">Send message</motion.span>
              )}
            </AnimatePresence>
          </Button>
          <p className="text-xs text-muted-foreground">
            Prefer email?{" "}
            <a href={`mailto:${siteConfig.email.contact}`} className="text-primary underline-offset-4 hover:underline">
              {siteConfig.email.contact}
            </a>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}

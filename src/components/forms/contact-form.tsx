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
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { FormSuccessCard } from "@/components/forms/form-success-card";
import { useAntiSpamGuard, turnstileEnabled } from "@/hooks/use-anti-spam-guard";
import { contactSchema, failsTimeTrap, type ContactFormValues } from "@/lib/validations";
import { countryOptions, serviceInterestOptions } from "@/lib/form-options";
import { siteConfig } from "@/data/site";

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
    defaultValues: {
      company: "",
      country: "",
      serviceInterested: "",
      website: "",
    },
  });

  useEffect(() => {
    const service = searchParams.get("service");
    const industry = searchParams.get("industry");
    if (service && serviceInterestOptions.includes(service)) {
      setValue("serviceInterested", service);
    }
    if (industry) {
      setValue("projectDetails", `I'm interested in solutions for the ${industry} industry. `);
    }
  }, [searchParams, setValue]);

  function resetForm() {
    reset({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      serviceInterested: "",
      projectDetails: "",
      website: "",
    });
  }

  async function onSubmit(data: ContactFormValues) {
    // Honeypot filled in, or submitted implausibly fast — silently "succeed" without actually
    // sending, so bots aren't tipped off and don't burn the Formspree monthly submission quota.
    if (data.website || failsTimeTrap(formRenderedAtRef.current)) {
      setStatus("success");
      resetForm();
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
          phone: data.phone,
          country: data.country,
          service_interested: data.serviceInterested,
          message: data.projectDetails,
          _replyto: data.email,
          _subject: `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
          ...(turnstileToken ? { "cf-turnstile-response": turnstileToken } : {}),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const message = json?.errors?.map((e: { message: string }) => e.message).join(", ");
        throw new Error(message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      resetForm();
    } catch (error) {
      setStatus("idle");
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessCard
        title="Message Sent!"
        description="Thanks for reaching out — a member of our team will get back to you within one business day."
        buttonLabel="Send Another Message"
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
      className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <HoneypotField {...register("website")} />

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Full Name</FieldLabel>
            <Input id="contact-name" placeholder="Jane Doe" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.company}>
            <FieldLabel htmlFor="contact-company">Company</FieldLabel>
            <Input id="contact-company" placeholder="Acme Inc." {...register("company")} />
            <FieldError errors={[errors.company]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input id="contact-email" type="email" placeholder="jane@company.com" {...register("email")} />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="contact-phone">Phone</FieldLabel>
            <Input id="contact-phone" type="tel" placeholder="+1 312 555 0100" {...register("phone")} />
            <FieldError errors={[errors.phone]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="contact-country">Country</FieldLabel>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-country" className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
          <Field data-invalid={!!errors.serviceInterested}>
            <FieldLabel htmlFor="contact-service">Service Interested</FieldLabel>
            <Controller
              control={control}
              name="serviceInterested"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-service" className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceInterestOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.serviceInterested]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.projectDetails}>
          <FieldLabel htmlFor="contact-details">Project Details</FieldLabel>
          <Textarea
            id="contact-details"
            rows={5}
            placeholder="Tell us about your project, goals, and timeline…"
            {...register("projectDetails")}
          />
          <FieldError errors={[errors.projectDetails]} />
        </Field>

        <TurnstileWidget onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />

        <Button type="submit" size="lg" className="rounded-full" disabled={status === "loading"}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span key="loading" className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Sending…
              </motion.span>
            ) : (
              <motion.span key="idle">Send Message</motion.span>
            )}
          </AnimatePresence>
        </Button>
      </FieldGroup>
    </form>
  );
}

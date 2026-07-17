"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
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
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { countryOptions, serviceInterestOptions, budgetOptions } from "@/lib/form-options";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  // Captured post-mount (not during render) so the anti-spam time-trap reflects when the
  // form actually became interactive, without calling Date.now() from render itself.
  const formRenderedAtRef = useRef(0);

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
      budget: "",
      website: "",
    },
  });

  useEffect(() => {
    formRenderedAtRef.current = Date.now();
  }, []);

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

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formRenderedAt: formRenderedAtRef.current }),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset({
        name: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        serviceInterested: "",
        budget: "",
        projectDetails: "",
        website: "",
      });
    } catch (error) {
      setStatus("idle");
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-2xl border bg-card p-10 text-center shadow-sm"
      >
        <CheckCircle2 className="size-14 text-primary" />
        <h3 className="mt-4 text-xl font-semibold">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thanks for reaching out — a member of our team will get back to you within one
          business day.
        </p>
        <Button className="mt-6 rounded-full" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </motion.div>
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
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
        {...register("website")}
      />

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
          <Field data-invalid={!!errors.budget}>
            <FieldLabel htmlFor="contact-budget">Budget</FieldLabel>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-budget" className="w-full">
                    <SelectValue placeholder="Select a budget range" />
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
        </div>

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

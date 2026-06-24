"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CircleCheck,
  Code2,
  Loader2,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { contactSchema, type ProjectType } from "@/lib/validation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const projectOptions: {
  id: ProjectType;
  label: string;
  blurb: string;
  icon: typeof Code2;
}[] = [
  { id: "web", label: "Web Design & Dev", blurb: "Marketing site, web app, or store", icon: Code2 },
  { id: "ai", label: "AI Automation", blurb: "Agents & process automation (Kritvia)", icon: Bot },
  { id: "cybersecurity", label: "Cybersecurity", blurb: "VAPT, ISO 27001, GDPR/DPDPA", icon: ShieldCheck },
  { id: "other", label: "Something else", blurb: "Not sure yet — let's talk", icon: MoreHorizontal },
];

const BUDGET_MIN = 25_000;
const BUDGET_MAX = 500_000;
const BUDGET_STEP = 25_000;

function formatBudget(v: number): string {
  const label = `₹${v.toLocaleString("en-IN")}`;
  return v >= BUDGET_MAX ? `${label}+` : label;
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [budget, setBudget] = useState(100_000);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [captchaToken, setCaptchaToken] = useState(siteKey ? "" : "dev-bypass");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);


  async function handleSubmit() {
    setError(null);

    const payload = {
      name,
      email,
      company,
      projectType: projectType ?? "other",
      budget,
      message,
      captchaToken,
      honeypot,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm sm:p-8">
      {/* Progress */}
      {step < 4 ? (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-ink-400">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      {/* Step 1 — project type */}
      {step === 1 ? (
        <div>
          <h2 className="text-xl font-semibold text-white">
            What can we help you build?
          </h2>
          <p className="mt-1 text-sm text-ink-300">Pick the closest fit.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {projectOptions.map((opt) => {
              const selected = projectType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setProjectType(opt.id);
                    setStep(2);
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                    selected
                      ? "border-gold-500 bg-gold-500/10 ring-1 ring-brand-600"
                      : "border-white/10 hover:border-gold-500/40 hover:bg-elevate",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-500/15 text-gold-300">
                    <opt.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {opt.label}
                    </span>
                    <span className="block text-sm text-ink-300">{opt.blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Step 2 — budget */}
      {step === 2 ? (
        <div>
          <h2 className="text-xl font-semibold text-white">
            What's your budget range?
          </h2>
          <p className="mt-1 text-sm text-ink-300">
            A rough number is fine — it helps us scope the right approach.
          </p>

          <div className="mt-8 text-center">
            <span className="text-4xl font-bold text-gold-300">
              {formatBudget(budget)}
            </span>
          </div>

          <input
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={BUDGET_STEP}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-6 w-full accent-brand-600"
            aria-label="Budget range"
          />
          <div className="mt-2 flex justify-between text-xs text-ink-400">
            <span>{formatBudget(BUDGET_MIN)}</span>
            <span>{formatBudget(BUDGET_MAX)}</span>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 3 — details */}
      {step === 3 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          <h2 className="text-xl font-semibold text-white">
            A few details and we're done.
          </h2>
          <p className="mt-1 text-sm text-ink-300">We reply within 24 hours.</p>

          <div className="mt-6 space-y-4">
            <Field label="Full name" htmlFor="name">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
                placeholder="Your name"
              />
            </Field>
            <Field label="Company (optional)" htmlFor="company">
              <input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
                placeholder="Company name"
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Brief" htmlFor="message">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className={cn(inputClass, "resize-y")}
                placeholder="What are you trying to build, and by when?"
              />
            </Field>

            {/* Honeypot — hidden from real users */}
            <div className="hidden" aria-hidden>
              <label htmlFor="company-url">Leave this empty</label>
              <input
                id="company-url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {siteKey ? (
              <Turnstile siteKey={siteKey} onSuccess={setCaptchaToken} />
            ) : (
              <p className="rounded-lg bg-elevate px-3 py-2 text-xs text-ink-400">
                CAPTCHA disabled in dev (no site key configured).
              </p>
            )}

            {error ? (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send brief <Check className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : null}

      {/* Step 4 — success */}
      {step === 4 ? (
        <div className="py-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-500/10 text-accent-400">
            <CircleCheck className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-white">
            Brief received.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-ink-300">
            Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We'll review it and
            reply within 24 hours. Want to skip the wait? Book a call now.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href={site.calendly} external size="lg">
              Book a discovery call <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-200">
        {label}
      </label>
      {children}
    </div>
  );
}

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { MessageCircle, Mail } from "lucide-react";
import { FIRM, mailto, waLink } from "@/lib/firm";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

const Schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255),
  matter: z.string().min(1, "Please select a matter type"),
  contact: z.enum(["whatsapp", "email", "phone"]),
  message: z.string().trim().min(10, "Please provide a brief description").max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the disclaimer" }) }),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  matter: string;
  contact: "whatsapp" | "email" | "phone";
  message: string;
  consent: boolean;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  matter: "",
  contact: "whatsapp",
  message: "",
  consent: false,
};

function buildMessage(d: FormState) {
  return [
    `Hello ${FIRM.short},`,
    "",
    `I would like to request legal assistance.`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Matter: ${d.matter}`,
    `Preferred contact: ${d.contact}`,
    "",
    "Message:",
    d.message,
  ].join("\n");
}

export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const r = Schema.safeParse(data);
    if (r.success) {
      setErrors({});
      return true;
    }
    const e: Record<string, string> = {};
    r.error.issues.forEach((i) => {
      const k = i.path[0] as string;
      if (!e[k]) e[k] = i.message;
    });
    setErrors(e);
    return false;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waLink(undefined, buildMessage(data));
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = mailto(
      FIRM.emails.primary,
      `Legal Consultation Request — ${data.name}`,
      buildMessage(data)
    );
  };

  return (
    <form onSubmit={handleWhatsApp} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name} htmlFor="name">
          <Input
            id="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Phone number" error={errors.phone} htmlFor="phone">
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={30}
            autoComplete="tel"
            required
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email} htmlFor="email">
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          maxLength={255}
          autoComplete="email"
          required
        />
      </Field>

      <Field label="Matter type" error={errors.matter} htmlFor="matter">
        <Select value={data.matter} onValueChange={(v) => update("matter", v)}>
          <SelectTrigger id="matter">
            <SelectValue placeholder="Select a matter" />
          </SelectTrigger>
          <SelectContent>
            {PRACTICE_AREAS.map((p) => (
              <SelectItem key={p.slug} value={p.title}>
                {p.title}
              </SelectItem>
            ))}
            <SelectItem value="Other / General enquiry">Other / General enquiry</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Preferred contact method" error={errors.contact}>
        <RadioGroup
          value={data.contact}
          onValueChange={(v) => update("contact", v as FormState["contact"])}
          className="flex flex-wrap gap-4"
        >
          {(["whatsapp", "email", "phone"] as const).map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm capitalize">
              <RadioGroupItem value={m} id={`c-${m}`} />
              {m}
            </label>
          ))}
        </RadioGroup>
      </Field>

      <Field label="Short message" error={errors.message} htmlFor="message">
        <Textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={1000}
          placeholder="Briefly describe your matter. Please avoid sharing highly sensitive information here."
          required
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <Checkbox
          checked={data.consent}
          onCheckedChange={(v) => update("consent", v === true)}
          className="mt-1"
        />
        <span>
          I understand that submitting this form does not create a lawyer-client
          relationship until formally accepted by {FIRM.short} Legal Practitioners.
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Please avoid submitting highly sensitive confidential information through this form.
      </p>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="submit" variant="whatsapp" size="lg">
          <MessageCircle className="h-4 w-4" />
          Send via WhatsApp
        </Button>
        <Button type="button" variant="navy" size="lg" onClick={handleEmail}>
          <Mail className="h-4 w-4" />
          Send via Email
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-navy-deep">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";

type FormState = {
  organisationName: string;
  industry: string;
  revenueBand: string;
  teamSizeBand: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const initialState: FormState = {
  organisationName: "",
  industry: "",
  revenueBand: "",
  teamSizeBand: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

const revenueBands = [
  "Below $500K",
  "$500K to $1M",
  "$1M to $3M",
  "$3M to $10M",
  "$10M to $25M",
  "Above $25M",
  "I am not sure",
  "I would rather not say",
];

const teamSizeBands = [
  "1 to 5",
  "6 to 15",
  "16 to 50",
  "51 to 100",
  "101 to 250",
  "Above 250",
];

export function DetailsForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    let supabase;

    try {
      supabase = createSupabaseClient();
    } catch {
      setError("Supabase is not configured. Add the public URL and anon key.");
      setIsSubmitting(false);
      return;
    }

    const organisationPayload = {
      name: form.organisationName,
      industry: form.industry || null,
      revenue_band: form.revenueBand || null,
      headcount_band: form.teamSizeBand || null,
    };

    const { data: organisation, error: organisationError } = await supabase
      .from("organisations")
      .insert(organisationPayload)
      .select("id")
      .single<{ id: string }>();

    if (organisationError || !organisation) {
      setError("Organisation could not be saved. Check the schema and policies.");
      setIsSubmitting(false);
      return;
    }

    const personPayload = {
      organisation_id: organisation.id,
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      role: form.role || null,
    };

    const { data: person, error: personError } = await supabase
      .from("people")
      .insert(personPayload)
      .select("id")
      .single<{ id: string }>();

    if (personError || !person) {
      setError("Contact could not be saved. Check the schema and policies.");
      setIsSubmitting(false);
      return;
    }

    const assessmentPayload = {
      organisation_id: organisation.id,
      person_id: person.id,
      type: "aperture_free",
      source: "self_serve",
      questionnaire_version: 3,
    };

    const { data: assessment, error: assessmentError } = await supabase
      .from("assessments")
      .insert(assessmentPayload)
      .select("id")
      .single<{ id: string }>();

    if (assessmentError || !assessment) {
      setError("Assessment could not be created. Check the schema and policies.");
      setIsSubmitting(false);
      return;
    }

    router.push(`/start/questions?assessment_id=${assessment.id}`);
  }

  return (
    <form className="mt-10 grid gap-8" onSubmit={submit}>
      <section className="rounded-[28px] bg-base p-5 shadow-[8px_8px_18px_#cbd0d3,-8px_-8px_18px_#ffffff] sm:p-6">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
          BUSINESS
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <TextField
            label="Organisation"
            onChange={(value) => updateField("organisationName", value)}
            required
            value={form.organisationName}
          />
          <TextField
            label="Industry"
            onChange={(value) => updateField("industry", value)}
            value={form.industry}
          />
          <SelectField
            label="Annual revenue"
            onChange={(value) => updateField("revenueBand", value)}
            options={revenueBands}
            value={form.revenueBand}
          />
          <SelectField
            label="Team size"
            onChange={(value) => updateField("teamSizeBand", value)}
            options={teamSizeBands}
            value={form.teamSizeBand}
          />
        </div>
      </section>

      <section className="rounded-[28px] bg-base p-5 shadow-[8px_8px_18px_#cbd0d3,-8px_-8px_18px_#ffffff] sm:p-6">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
          CONTACT
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <TextField
            label="First name"
            onChange={(value) => updateField("firstName", value)}
            required
            value={form.firstName}
          />
          <TextField
            label="Last name"
            onChange={(value) => updateField("lastName", value)}
            required
            value={form.lastName}
          />
          <TextField
            label="Email"
            onChange={(value) => updateField("email", value)}
            required
            type="email"
            value={form.email}
          />
          <TextField
            label="Role"
            onChange={(value) => updateField("role", value)}
            value={form.role}
          />
        </div>
      </section>

      {error ? (
        <p className="rounded-[18px] bg-[#f3dddd] px-5 py-4 text-[14px] text-[#7f2626]">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          className="rounded-full bg-base px-8 py-4 text-[14px] font-medium text-ink shadow-[8px_8px_18px_#cbd0d3,-8px_-8px_18px_#ffffff] transition disabled:cursor-not-allowed disabled:opacity-40"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating assessment" : "Start questions"}
        </button>
      </div>
    </form>
  );
}

function TextField({
  label,
  onChange,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-[13px] font-medium text-ink-soft">
      {label}
      <input
        className="min-h-[52px] rounded-[18px] border-0 bg-base px-4 text-[15px] text-ink shadow-[inset_6px_6px_12px_#cbd0d3,inset_-6px_-6px_12px_#ffffff] outline-none"
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="grid gap-2 text-[13px] font-medium text-ink-soft">
      {label}
      <select
        className="min-h-[52px] rounded-[18px] border-0 bg-base px-4 text-[15px] text-ink shadow-[inset_6px_6px_12px_#cbd0d3,inset_-6px_-6px_12px_#ffffff] outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

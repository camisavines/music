"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User, CalendarDays, Building2,
  Music, Send, CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { bookingSchema, type BookingFormData } from "@/lib/booking-schema";
import {
  Button,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Form,
  Stack,
} from "@carbon/react";

const eventTypeOptions = [
  { value: "Wedding",          label: "💍 Wedding" },
  { value: "Club Night",       label: "🎧 Club Night" },
  { value: "Corporate Event",  label: "🏢 Corporate Event" },
  { value: "Private Party",    label: "🎉 Private Party" },
  { value: "Festival",         label: "🎪 Festival" },
  { value: "Birthday",         label: "🎂 Birthday" },
  { value: "Other",            label: "✨ Other" },
];

const guestCountOptions = [
  { value: "1-50",         label: "1–50 guests" },
  { value: "51-100",       label: "51–100 guests" },
  { value: "101-200",      label: "101–200 guests" },
  { value: "201-500",      label: "201–500 guests" },
  { value: "501-1000",     label: "501–1,000 guests" },
  { value: "1001-5000",    label: "1,001–5,000 guests" },
  { value: "5001-plus",    label: "5,000+ guests" },
];

// ─── Section header ───────────────────────────────────────────────────────────
function SectionLegend({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.6875rem",
      fontWeight: 600,
      color: "var(--accent-gold)",
      textTransform: "uppercase",
      letterSpacing: "0.25em",
      marginBottom: "1.25rem",
      paddingBottom: "0.5rem",
      borderBottom: "1px solid rgba(201,168,76,0.1)",
    }}>
      <Icon size={14} />
      {label}
    </div>
  );
}

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      toast.success("Booking inquiry sent!", {
        description: "We'll get back to you within 24 hours.",
        duration: 6000,
      });
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit. Please try again.";
      toast.error("Submission failed", { description: message, duration: 6000 });
    }
  };

  return (
    <section
      id="booking"
      style={{
        position: "relative",
        padding: "8rem 0",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div
        aria-hidden
        className="cyber-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      />

      <div
        className="section-inner"
        style={{ position: "relative", zIndex: 1, maxWidth: "56rem" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{
            fontSize: "0.6875rem",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--accent-gold)",
            marginBottom: "0.75rem",
            display: "block",
          }}>
            Let&apos;s Work Together
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
            margin: 0,
          }}>
            Book <span style={{ color: "var(--accent-gold)" }}>DJ Neva Misa Beat</span>
          </h2>
          <p style={{
            maxWidth: "38rem",
            margin: "1rem auto 0",
            color: "#94a3b8",
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            Ready to move forward? Fill out the form below and we&apos;ll confirm
            availability and lock in your date within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass neon-border-gold"
            style={{
              borderRadius: "1rem",
              padding: "2.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <CheckCircle2 size={32} style={{ color: "var(--accent-gold)" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem" }}>
                Inquiry Received!
              </h3>
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Thanks for reaching out. Check your email for a confirmation and we&apos;ll be in touch
                within 24 hours with availability and pricing.
              </p>
            </div>
            <Button kind="tertiary" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass neon-border"
            style={{
              borderRadius: "1rem",
              padding: "clamp(1.5rem, 5vw, 2.5rem)",
            }}
          >
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack gap={8}>

                {/* Contact Information */}
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <SectionLegend icon={User} label="Contact Information" />
                  <Stack gap={5}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
                      <TextInput
                        id="fullName"
                        labelText="Full Name *"
                        placeholder="Jane Smith"
                        invalid={!!errors.fullName}
                        invalidText={errors.fullName?.message}
                        {...register("fullName")}
                      />
                      <TextInput
                        id="email"
                        type="email"
                        labelText="Email Address *"
                        placeholder="jane@example.com"
                        invalid={!!errors.email}
                        invalidText={errors.email?.message}
                        {...register("email")}
                      />
                    </div>
                    <TextInput
                      id="phone"
                      type="tel"
                      labelText="Phone Number *"
                      placeholder="+1 (555) 000-0000"
                      invalid={!!errors.phone}
                      invalidText={errors.phone?.message}
                      {...register("phone")}
                    />
                  </Stack>
                </fieldset>

                {/* Event Details */}
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <SectionLegend icon={CalendarDays} label="Event Details" />
                  <Stack gap={5}>
                    <Controller
                      name="eventType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="eventType"
                          labelText="Event Type *"
                          invalid={!!errors.eventType}
                          invalidText={errors.eventType?.message}
                          {...field}
                        >
                          <SelectItem value="" text="Select event type" disabled />
                          {eventTypeOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value} text={o.label} />
                          ))}
                        </Select>
                      )}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
                      <TextInput
                        id="eventDate"
                        type="date"
                        labelText="Event Date *"
                        invalid={!!errors.eventDate}
                        invalidText={errors.eventDate?.message}
                        {...register("eventDate")}
                      />
                      <TextInput
                        id="eventTime"
                        type="time"
                        labelText="Start Time *"
                        invalid={!!errors.eventTime}
                        invalidText={errors.eventTime?.message}
                        {...register("eventTime")}
                      />
                    </div>
                  </Stack>
                </fieldset>

                {/* Venue */}
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <SectionLegend icon={Building2} label="Venue" />
                  <Stack gap={5}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
                      <TextInput
                        id="venueName"
                        labelText="Venue Name *"
                        placeholder="The Grand Ballroom"
                        invalid={!!errors.venueName}
                        invalidText={errors.venueName?.message}
                        {...register("venueName")}
                      />
                      <Controller
                        name="guestCount"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="guestCount"
                            labelText="Estimated Guest Count *"
                            invalid={!!errors.guestCount}
                            invalidText={errors.guestCount?.message}
                            {...field}
                          >
                            <SelectItem value="" text="Select range" disabled />
                            {guestCountOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value} text={o.label} />
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <TextInput
                      id="venueAddress"
                      labelText="Venue Address *"
                      placeholder="123 Main St, Austin, TX 90001"
                      invalid={!!errors.venueAddress}
                      invalidText={errors.venueAddress?.message}
                      {...register("venueAddress")}
                    />
                  </Stack>
                </fieldset>

                {/* Music & Equipment */}
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <SectionLegend icon={Music} label="Music & Equipment" />
                  <Stack gap={5}>
                    <TextArea
                      id="musicalPreferences"
                      labelText="Musical Preferences / Vibe *"
                      placeholder="e.g. Deep house, hip-hop, top 40 pop — upbeat and high energy throughout the night"
                      rows={3}
                      invalid={!!errors.musicalPreferences}
                      invalidText={errors.musicalPreferences?.message}
                      {...register("musicalPreferences")}
                    />
                    <TextArea
                      id="equipmentRequirements"
                      labelText="Equipment Requirements"
                      placeholder="e.g. Full PA system needed, venue has no speakers."
                      rows={3}
                      invalid={!!errors.equipmentRequirements}
                      invalidText={errors.equipmentRequirements?.message}
                      {...register("equipmentRequirements")}
                    />
                    <TextArea
                      id="additionalNotes"
                      labelText="Additional Notes"
                      placeholder="Any special requests, set length, important timeline notes..."
                      rows={3}
                      invalid={!!errors.additionalNotes}
                      invalidText={errors.additionalNotes?.message}
                      {...register("additionalNotes")}
                    />
                  </Stack>
                </fieldset>

                {/* Submit */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  paddingTop: "0.5rem",
                }}>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    * Required fields. Your information is kept strictly confidential.
                  </p>
                  <Button
                    type="submit"
                    kind="primary"
                    size="lg"
                    disabled={isSubmitting}
                    style={{ minWidth: "10rem", justifyContent: "center" }}
                  >
                    <Send size={16} style={{ marginRight: "0.5rem" }} />
                    {isSubmitting ? "Sending…" : "Send Inquiry"}
                  </Button>
                </div>

              </Stack>
            </Form>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User, CalendarDays, Building2,
  Music, Send, CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { bookingSchema, type BookingFormData } from "@/lib/booking-schema";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

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

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
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
    <section id="booking" className="relative py-32 bg-dark-900">
      <div className="absolute inset-0 cyber-grid opacity-15" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 mb-3 block">
            Let&apos;s Work Together
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-white mb-4">
            Book <span style={{ color: "#C9A84C" }}>DJ Axiom</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 font-light leading-relaxed">
            Ready to move forward? Fill out the form below and we&apos;ll confirm
            availability and lock in your date within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass neon-border-gold rounded-2xl p-10 text-center flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gold-400/15 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
              <p className="text-slate-400">
                Thanks for reaching out. Check your email for a confirmation and we&apos;ll be in touch
                within 24 hours with availability and pricing.
              </p>
            </div>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass neon-border rounded-2xl p-6 sm:p-10 space-y-10"
            noValidate
          >
            {/* Contact Info */}
            <fieldset>
              <legend className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-[0.25em] mb-5 pb-2 border-b border-gold-400/10 w-full">
                <User className="w-3.5 h-3.5" />
                Contact Information
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="fullName"
                  label="Full Name *"
                  placeholder="Jane Smith"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email Address *"
                  placeholder="jane@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  id="phone"
                  type="tel"
                  label="Phone Number *"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                  className="sm:col-span-2"
                />
              </div>
            </fieldset>

            {/* Event Details */}
            <fieldset>
              <legend className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-[0.25em] mb-5 pb-2 border-b border-gold-400/10 w-full">
                <CalendarDays className="w-3.5 h-3.5" />
                Event Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <Select
                    id="eventType"
                    label="Event Type *"
                    options={eventTypeOptions}
                    placeholder="Select event type"
                    error={errors.eventType?.message}
                    {...register("eventType")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    id="eventDate"
                    type="date"
                    label="Event Date *"
                    error={errors.eventDate?.message}
                    {...register("eventDate")}
                  />
                </div>
                <Input
                  id="eventTime"
                  type="time"
                  label="Start Time *"
                  error={errors.eventTime?.message}
                  {...register("eventTime")}
                />
              </div>
            </fieldset>

            {/* Venue */}
            <fieldset>
              <legend className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-[0.25em] mb-5 pb-2 border-b border-gold-400/10 w-full">
                <Building2 className="w-3.5 h-3.5" />
                Venue
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="venueName"
                  label="Venue Name *"
                  placeholder="The Grand Ballroom"
                  error={errors.venueName?.message}
                  {...register("venueName")}
                />
                <div className="sm:col-span-1">
                  <Select
                    id="guestCount"
                    label="Estimated Guest Count *"
                    options={guestCountOptions}
                    placeholder="Select range"
                    error={errors.guestCount?.message}
                    {...register("guestCount")}
                  />
                </div>
                <Input
                  id="venueAddress"
                  label="Venue Address *"
                  placeholder="123 Main St, Los Angeles, CA 90001"
                  error={errors.venueAddress?.message}
                  {...register("venueAddress")}
                  className="sm:col-span-2"
                />
              </div>
            </fieldset>

            {/* Music & Equipment */}
            <fieldset>
              <legend className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-[0.25em] mb-5 pb-2 border-b border-gold-400/10 w-full">
                <Music className="w-3.5 h-3.5" />
                Music &amp; Equipment
              </legend>
              <div className="grid grid-cols-1 gap-4">
                <Textarea
                  id="musicalPreferences"
                  label="Musical Preferences / Vibe *"
                  placeholder="e.g. Deep house, hip-hop, top 40 pop — upbeat and high energy throughout the night"
                  rows={3}
                  error={errors.musicalPreferences?.message}
                  {...register("musicalPreferences")}
                />
                <Textarea
                  id="equipmentRequirements"
                  label="Equipment Requirements"
                  placeholder="e.g. Full PA system needed, venue has no speakers. Need intelligent lighting rig for 200 guests."
                  rows={3}
                  error={errors.equipmentRequirements?.message}
                  {...register("equipmentRequirements")}
                />
                <Textarea
                  id="additionalNotes"
                  label="Additional Notes"
                  placeholder="Any special requests, set length, important timeline notes..."
                  rows={3}
                  error={errors.additionalNotes?.message}
                  {...register("additionalNotes")}
                />
              </div>
            </fieldset>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-500">
                * Required fields. Your information is kept strictly confidential.
              </p>
              <Button type="submit" size="lg" loading={isSubmitting} className="min-w-[160px]">
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending…" : "Send Inquiry"}
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

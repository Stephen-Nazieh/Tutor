-- Migration: Add One-on-One Booking System

-- Create OneOnOneRequestStatus enum
CREATE TYPE "OneOnOneRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'PAID', 'CANCELLED');

-- Create OneOnOneRequest table
CREATE TABLE "OneOnOneRequest" (
  "id" text PRIMARY KEY NOT NULL,
  "tutorId" text NOT NULL,
  "studentId" text NOT NULL,
  "requestedAt" timestamp with time zone NOT NULL,
  "duration" integer NOT NULL,
  "pricePerHour" double precision NOT NULL,
  "totalPrice" double precision NOT NULL,
  "status" "OneOnOneRequestStatus" NOT NULL,
  "proposedSlots" jsonb,
  "selectedSlot" jsonb,
  "tutorNotes" text,
  "studentNotes" text,
  "calendarEventId" text,
  "paymentId" text,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);

-- Indexes for better performance
CREATE INDEX "OneOnOneRequest_tutorId_idx" ON "OneOnOneRequest"("tutorId");
CREATE INDEX "OneOnOneRequest_studentId_idx" ON "OneOnOneRequest"("studentId");
CREATE INDEX "OneOnOneRequest_status_idx" ON "OneOnOneRequest"("status");

-- Add oneOnOneEnabled field to Profile table
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "oneOnOneEnabled" boolean;

-- Add comments for documentation
COMMENT ON TABLE "OneOnOneRequest" IS 'One-on-one tutoring session requests between students and tutors';
COMMENT ON COLUMN "OneOnOneRequest"."proposedSlots" IS 'JSON array of {date, startTime, endTime} objects proposed by student';
COMMENT ON COLUMN "OneOnOneRequest"."selectedSlot" IS 'The time slot selected by tutor when accepting';

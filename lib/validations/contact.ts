/**
 * Contact Form Validation Schema
 * Zod schema for validating contact form submissions
 */

import { z } from 'zod';

/**
 * Contact reason options
 */
export const contactReasons = [
  { value: 'hire', label: 'Hire Me', icon: '💰', description: 'Full-time or contract work' },
  { value: 'collaboration', label: 'Collaboration', icon: '🤝', description: 'Project partnership' },
  { value: 'question', label: 'Question', icon: '💡', description: 'Ask me something' },
  { value: 'hello', label: 'Just Saying Hi', icon: '👋', description: 'Casual greeting' },
] as const;

export type ContactReason = typeof contactReasons[number]['value'];

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),

  reason: z.enum(['hire', 'collaboration', 'question', 'hello']),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
});

/**
 * Type for contact form data
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Individual step schemas for progressive validation
 */
export const stepSchemas = {
  name: z.object({
    name: contactFormSchema.shape.name,
  }),
  email: z.object({
    email: contactFormSchema.shape.email,
  }),
  reason: z.object({
    reason: contactFormSchema.shape.reason,
  }),
  message: z.object({
    message: contactFormSchema.shape.message,
  }),
};

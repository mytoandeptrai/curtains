import { z } from 'zod';

export const bookingBaseSchema = z.object({
  lead_id: z.string().uuid('Invalid lead'),
  booking_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format YYYY-MM-DD'),
  booking_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format HH:mm'),
  status: z.enum(['pending', 'confirmed', 'done']),
  notes: z.string().max(500).optional().or(z.literal('')),
});

export const bookingCreateSchema = bookingBaseSchema;
export const bookingEditSchema = bookingBaseSchema;

export type BookingCreate = z.infer<typeof bookingCreateSchema>;
export type BookingEdit = z.infer<typeof bookingEditSchema>;

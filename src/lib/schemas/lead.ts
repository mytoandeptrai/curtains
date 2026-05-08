import { z } from 'zod';

export const leadEditSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(20),
  address: z.string().min(1, 'Address is required'),
  status: z.enum(['new', 'contacted', 'closed']),
  notes: z.string().max(1000).optional().or(z.literal('')),
});

export type LeadEdit = z.infer<typeof leadEditSchema>;

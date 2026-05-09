'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { FormSelect } from '@/components/form-fields/form-select';
import { bookingEditSchema } from '@/lib/schemas/booking';
import type { BookingEdit } from '@/lib/schemas/booking';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'done', label: 'Done' },
];

interface LeadOption {
  value: string;
  label: string;
}

interface BookingEditUIProps {
  onSubmit: (data: BookingEdit) => Promise<void>;
  isLoading: boolean;
  leadOptions: LeadOption[];
  defaultValues?: Partial<BookingEdit>;
}

export function BookingEditUI({ onSubmit, isLoading, leadOptions, defaultValues }: BookingEditUIProps) {
  const form = useForm<BookingEdit>({
    resolver: zodResolver(bookingEditSchema),
    defaultValues: {
      lead_id: '',
      booking_date: '',
      booking_time: '',
      status: 'pending',
      notes: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...form.getValues(), ...defaultValues });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSelect
          control={form.control}
          name="lead_id"
          label="Lead"
          options={leadOptions}
          placeholder="Select a lead"
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="booking_date"
            label="Booking Date"
            placeholder="YYYY-MM-DD"
            required
          />

          <FormInput
            control={form.control}
            name="booking_time"
            label="Booking Time"
            placeholder="HH:mm"
            required
          />
        </div>

        <FormSelect
          control={form.control}
          name="status"
          label="Status"
          options={STATUS_OPTIONS}
          required
        />

        <FormTextarea
          control={form.control}
          name="notes"
          label="Notes"
          placeholder="Additional notes about this booking..."
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

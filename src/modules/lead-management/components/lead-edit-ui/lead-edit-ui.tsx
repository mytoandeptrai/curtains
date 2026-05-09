'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { FormSelect } from '@/components/form-fields/form-select';
import { leadEditSchema } from '@/lib/schemas/lead';
import type { LeadEdit } from '@/lib/schemas/lead';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

interface LeadEditUIProps {
  onSubmit: (data: LeadEdit) => Promise<void>;
  isLoading: boolean;
  defaultValues?: Partial<LeadEdit>;
  estimatedPrice?: number;
  productName?: string;
  createdAt?: string;
}

export function LeadEditUI({
  onSubmit,
  isLoading,
  defaultValues,
  estimatedPrice,
  productName,
  createdAt,
}: LeadEditUIProps) {
  const form = useForm<LeadEdit>({
    resolver: zodResolver(leadEditSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      status: 'new',
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
        {(productName || estimatedPrice || createdAt) && (
          <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
            <h3 className="font-medium text-sm">Lead Information (read-only)</h3>
            {productName && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Product:</span> {productName}
              </p>
            )}
            {estimatedPrice !== undefined && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Estimated Price:</span>{' '}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  maximumFractionDigits: 0,
                }).format(estimatedPrice)}
              </p>
            )}
            {createdAt && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Submitted:</span>{' '}
                {new Date(createdAt).toLocaleString('vi-VN')}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="name"
            label="Customer Name"
            placeholder="Full name"
            required
          />

          <FormInput
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="e.g., 0901234567"
            required
          />
        </div>

        <FormInput
          control={form.control}
          name="address"
          label="Address"
          placeholder="Installation address"
          required
        />

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
          placeholder="Internal notes about this lead..."
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

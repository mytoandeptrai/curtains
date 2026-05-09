'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetLeadDetail, useUpdateLeadMutation } from '@/api/leads';
import { useQueryClient } from '@tanstack/react-query';
import type { LeadEdit } from '@/lib/schemas/lead';

export function useLeadEdit(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: leadData, isLoading: isFetching } = useGetLeadDetail({ id });
  const updateMutation = useUpdateLeadMutation();

  // Map new API fields to old schema fields for backward compatibility with existing UI
  const defaultValues: Partial<LeadEdit> | undefined = leadData?.data
    ? {
        name: leadData.data.customer_name,
        phone: leadData.data.customer_phone,
        address: '',
        status: leadData.data.status,
        notes: leadData.data.notes,
      }
    : undefined;

  const onSubmit = async (data: LeadEdit) => {
    try {
      await updateMutation.mutateAsync({
        id,
        customer_name: data.name,
        customer_email: '', // Form doesn't have email field
        customer_phone: data.phone,
        product_id: '', // Form doesn't have product_id field
        status: data.status,
        notes: data.notes,
      });

      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
      router.push('/admin/leads');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update lead';
      toast.error(message);
    }
  };

  return { onSubmit, isLoading: updateMutation.isPending, isFetching, defaultValues };
}

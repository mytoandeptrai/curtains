'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { LeadEdit } from '@/lib/schemas/lead';

interface LeadData extends LeadEdit {
  estimated_price?: number;
  product_name?: string;
  created_at?: string;
}

export function useLeadEdit(id: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [defaultValues, setDefaultValues] = useState<Partial<LeadEdit> | undefined>();
  const [leadMeta, setLeadMeta] = useState<{
    estimatedPrice?: number;
    productName?: string;
    createdAt?: string;
  }>({});

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`/api/admin/leads/${id}`);
        if (!response.ok) throw new Error('Failed to fetch lead');

        const data: LeadData = await response.json();
        setDefaultValues({
          name: data.name,
          phone: data.phone,
          address: data.address,
          status: data.status,
          notes: data.notes,
        });
        setLeadMeta({
          estimatedPrice: data.estimated_price,
          productName: data.product_name,
          createdAt: data.created_at,
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch lead';
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchLead();
  }, [id]);

  const onSubmit = async (data: LeadEdit) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update lead');
      }

      toast.success('Lead updated successfully');
      router.push('/admin/leads');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update lead';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, isFetching, defaultValues, leadMeta };
}

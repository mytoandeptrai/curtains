'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useBookingCreateForm } from '../hooks/use-booking-create';
import { BookingCreateUI } from '../components/booking-create-ui/booking-create-ui';

interface LeadOption {
  value: string;
  label: string;
}

export function BookingCreateContainer() {
  const { onSubmit, isPending } = useBookingCreateForm();
  const [leadOptions, setLeadOptions] = useState<LeadOption[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/admin/leads?limit=100');
        if (response.ok) {
          const data = await response.json();
          const options = (data.data || []).map((l: { id: string; customer_name: string }) => ({
            value: l.id,
            label: l.customer_name,
          }));
          setLeadOptions(options);
        }
      } catch {
        toast.error('Failed to load leads');
      }
    };

    fetchLeads();
  }, []);

  return (
    <BookingCreateUI
      onSubmit={onSubmit}
      isLoading={isPending}
      leadOptions={leadOptions}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useBookingEditForm } from '../hooks/use-booking-edit';
import { BookingEditUI } from '../components/booking-edit-ui/booking-edit-ui';

interface LeadOption {
  value: string;
  label: string;
}

interface BookingEditContainerProps {
  id: string;
}

export function BookingEditContainer({ id }: BookingEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues } = useBookingEditForm(id);
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

  if (isFetching) {
    return <div className="text-muted-foreground">Loading booking...</div>;
  }

  return (
    <BookingEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      leadOptions={leadOptions}
    />
  );
}

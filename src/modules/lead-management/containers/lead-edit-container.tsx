'use client';

import { useLeadEdit } from '../hooks/use-lead-edit';
import { LeadEditUI } from '../components/lead-edit-ui/lead-edit-ui';

interface LeadEditContainerProps {
  id: string;
}

export function LeadEditContainer({ id }: LeadEditContainerProps) {
  const { onSubmit, isLoading, isFetching, defaultValues } = useLeadEdit(id);

  if (isFetching) {
    return <div className="text-muted-foreground">Loading lead...</div>;
  }

  return (
    <LeadEditUI
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
    />
  );
}

'use client';

import { LeadListUI } from '../components/lead-list-ui/lead-list-ui';
import { useLeadList } from '../hooks/use-lead-list';

export function LeadListContainer() {
  const { data, total, isLoading, search, setSearch, status, setStatus, offset, setOffset, limit } =
    useLeadList();

  return (
    <LeadListUI
      leads={data}
      total={total}
      isLoading={isLoading}
      search={search}
      onSearchChange={setSearch}
      status={status}
      onStatusChange={setStatus}
      offset={offset}
      limit={limit}
      onOffsetChange={setOffset}
    />
  );
}

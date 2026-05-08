import { FCC } from '@/types';
import { Loader2Icon } from 'lucide-react';

export const LoadingStack: FCC = () => {
  return (
    <div className='flex items-center justify-center p-4'>
      <Loader2Icon className='size-8 animate-spin text-primary' />
    </div>
  );
};


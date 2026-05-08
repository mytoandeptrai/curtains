import SearchKbarInput from '@/components/ui/kbar/search-kbar-input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/ui/user-avatar-profile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores';
import { useAdminAuth } from '@/hooks/use-admin-auth';

export default function AppHeader() {
  const { user } = useUserStore();
  const { open, isMobile } = useSidebar();
  const { admin_email, logout, isLoading } = useAdminAuth();
  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex h-16 w-[calc(100dvw-var(--sidebar-width))] shrink-0 items-center justify-between gap-2 bg-background',
        {
          'w-[calc(100dvw-var(--sidebar-width-icon))]': !open,
          'w-full': isMobile,
        }
      )}
    >
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
        <div className='hidden md:flex'>
          <SearchKbarInput />
        </div>
      </div>
      <div className='flex items-center gap-3 pr-4'>
        {admin_email && (
          <span className='hidden text-sm text-muted-foreground md:block'>{admin_email}</span>
        )}
        <Button onClick={logout} disabled={isLoading} variant='ghost' size='sm'>
          {isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}
        </Button>
        <div>
          <UserAvatarProfile user={user} />
        </div>
      </div>
    </header>
  );
}

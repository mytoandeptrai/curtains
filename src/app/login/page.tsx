'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminLoginSchema, type AdminLogin } from '@/lib/schemas/auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useAdminAuthStore } from '@/stores/admin-auth-store';
import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuthStore();
  const { login, isLoading } = useAdminAuth();

  const form = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: AdminLogin) => {
    try {
      await login(data.email, data.password);
      toast.success('Đăng nhập thành công');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      toast.error(message);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-2xl font-bold'>Admin Login</h1>

        <FormWrapper form={form} onSubmit={onSubmit} className='space-y-4'>
            <FormInput
              control={form.control}
              name='email'
              label='Email'
              type='email'
              placeholder='admin@example.com'
              required
            />

            <FormInput
              control={form.control}
              name='password'
              label='Mật khẩu'
              type='password'
              placeholder='••••••••'
              required
            />

            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
        </FormWrapper>

        <p className='mt-4 text-center text-sm text-gray-600'>
          <a href='#' className='text-blue-600 hover:underline'>
            Quên mật khẩu?
          </a>
        </p>
      </div>
    </div>
  );
}

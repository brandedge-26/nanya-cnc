// src/app/(auth)/auth-success/AuthSuccessContent.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

export default function AuthSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                const message = "Login successful!";
                const accessToken = token;

                localStorage.setItem('accessToken', accessToken);
                setUser(user);
                toast.success(message);
                router.push('/');
            } catch (error) {
                console.error('Auth error:', error);
                toast.error('Authentication failed');
                router.push('/login');
            }
        } else {
            toast.error('Invalid authentication data');
            router.push('/login');
        }
    }, [searchParams, router, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Loader className="animate-spin mx-auto mb-4 text-orange-500" size={30} />
                <h2 className="text-xl font-normal tracking-tighter">Authenticating...</h2>
            </div>
        </div>
    );
}
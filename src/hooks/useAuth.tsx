import { useMutation } from '@tanstack/react-query';
import type { User } from '@/interfaces';
import pb from '@/lib/pocketbase/database';
import { useAuthStore } from '@/stores/auth';

interface AuthInput {
	email: string;
	password: string;
}

export function useAuth() {
	const setAuth = useAuthStore((s) => s.setAuth);

	return useMutation({
		mutationKey: ['auth'],
		mutationFn: async ({ email, password }: AuthInput) => {
			const res = await pb
				.collection('users')
				.authWithPassword(email, password, { requestKey: null });

			const user = res.record as User;
			const token = pb.authStore.token;

			await setAuth(user, token);

			return user;
		},
	});
}

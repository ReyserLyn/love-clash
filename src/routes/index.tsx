import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/')({
	beforeLoad: async () => {
		const state = useAuthStore.getState();
		if (!state.user) {
			await state.restoreAuth();
		}

		const { user } = useAuthStore.getState();
		throw redirect({ to: user ? '/home' : '/landing' });
	},
	component: () => null,
});

import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		const { user } = useAuthStore.getState();
		if (user) {
			throw redirect({
				to: '/home',
			});
		} else {
			throw redirect({
				to: '/landing',
			});
		}
	},
	component: () => null,
});

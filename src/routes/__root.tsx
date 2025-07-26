import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAuthStore } from '@/stores/auth';

export const Route = createRootRoute({
	loader: async () => {
		await useAuthStore.getState().restoreAuth();
	},
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position='top-right' />
		</>
	),
});

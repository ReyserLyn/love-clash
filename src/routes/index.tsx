import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import LandingPage from '@/pages/landing-page';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	const { user } = useAuthStore();
	return user ? <HomePage /> : <LandingPage />;
}

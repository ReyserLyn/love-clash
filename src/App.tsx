import Home from '@/legacy/home-page';
import Landing from '@/pages/landing-page';
import { useAuthStore } from '@/stores/auth';

export default function App() {
	const { user } = useAuthStore();
	return user ? <Home /> : <Landing />;
}

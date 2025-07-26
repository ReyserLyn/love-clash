import { Navigate } from '@tanstack/react-router';
import Logout from '@/components/auth/logout';
import { useAuthStore } from '@/stores/auth';

export default function HomePage() {
	const { user } = useAuthStore();

	if (!user) {
		return <Navigate to='/login' />;
	}

	return (
		<section className='flex flex-col items-center justify-center h-full gap-10'>
			<p className='text-2xl font-bold'>Hola, {user.name}</p>
			<h1 className='text-4xl font-bold'>Love Notes</h1>

			<Logout />
		</section>
	);
}

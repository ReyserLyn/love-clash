import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbase/database';
import { useAuthStore } from '@/stores/auth';

export default function Logout() {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		pb.authStore.clear();
		navigate({ to: '/' });
	};

	return (
		<Button
			onClick={handleLogout}
			variant='outline'
			className='flex items-center gap-2'
		>
			<LogOut className='w-4 h-4' />
			Cerrar sesión
		</Button>
	);
}

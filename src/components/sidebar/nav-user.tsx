import { IconDotsVertical, IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth';

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		document.body.style.pointerEvents = 'auto';
		logout();
		navigate({ to: '/' });
	};

	const handleMyAccount = () => {
		document.body.style.pointerEvents = 'auto';

		navigate({ to: '/mi-cuenta' });
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className='rounded-lg'>
									<img
										src='/assets/trace-corazon.svg'
										alt='logo'
										className='w-4'
									/>
								</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{user.name}</span>
								<span className='text-muted-foreground truncate text-xs'>
									{user.email}
								</span>
							</div>
							<IconDotsVertical className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuItem onClick={handleMyAccount}>
							<IconUser />
							Mi cuenta
						</DropdownMenuItem>

						<DropdownMenuItem onClick={handleLogout}>
							<IconLogout />
							Cerrar sesión
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

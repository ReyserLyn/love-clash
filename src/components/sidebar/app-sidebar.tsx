import {
	IconChartBar,
	IconHeartHandshake,
	IconHelp,
	IconHomeHeart,
	IconSettings,
	IconUserHeart,
	IconUserPlus,
} from '@tabler/icons-react';
import type * as React from 'react';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavUser } from '@/components/sidebar/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuthStore();

	const data = {
		user: {
			name: user?.name || '',
			email: user?.email || '',
			avatar: user?.avatar || '',
		},
		navMain: [
			{
				title: 'Inicio',
				url: '/home',
				icon: IconHomeHeart,
			},
			{
				title: 'Invitar a tu pareja',
				url: '/invitar-pareja',
				icon: IconUserPlus,
			},
			{
				title: 'Notas de amor',
				url: '/notas-de-amor',
				icon: IconHeartHandshake,
			},
			{
				title: 'Mi Pareja',
				url: '/mi-pareja',
				icon: IconUserHeart,
			},
			{
				title: 'Estadísticas',
				url: '/estadisticas',
				icon: IconChartBar,
			},
		],
		navSecondary: [
			{
				title: 'Configuración',
				url: '/configuracion',
				icon: IconSettings,
			},
			{
				title: 'Ayuda',
				url: '/ayuda',
				icon: IconHelp,
			},
		],
	};

	return (
		<Sidebar collapsible='offcanvas' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className='mt-5'>
						<SidebarMenuButton
							asChild
							className='data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent active:bg-transparent'
						>
							<div>
								<img
									src='/assets/trace-corazon.svg'
									alt='logo'
									className='w-4'
								/>
								<span className='text-base font-potta'>Love Notes</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}

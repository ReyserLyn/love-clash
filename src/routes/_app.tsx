import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';

export const Route = createFileRoute('/_app')({
	component: () => {
		return (
			<SidebarProvider>
				<AppSidebar className='hidden md:flex' />
				<SidebarInset>
					<div className='min-h-screen flex flex-col'>
						<header className='mt-5 flex h-12 shrink-0 items-center px-4'>
							<SidebarTrigger className='absolute z-10 w-10 h-10' />
							<div className='flex items-center gap-2 justify-center text-2xl font-potta w-full'>
								<img
									src='/assets/trace-corazon.svg'
									alt='logo'
									className='w-4'
								/>
								<span>Love Clash</span>
							</div>
						</header>

						<main className='flex-1 p-4'>
							<Outlet />
						</main>
					</div>
				</SidebarInset>
			</SidebarProvider>
		);
	},
});

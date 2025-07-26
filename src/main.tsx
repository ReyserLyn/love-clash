import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from './providers/react-query';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<div className='font-host'>
				<RouterProvider router={router} />
				<Toaster position='top-center' richColors offset={16} />
			</div>
		</ReactQueryProvider>
	</React.StrictMode>
);

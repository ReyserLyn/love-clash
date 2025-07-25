import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
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
			<div className='container font-host'>
				<RouterProvider router={router} />
			</div>
		</ReactQueryProvider>
	</React.StrictMode>
);

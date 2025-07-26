import { createFileRoute } from '@tanstack/react-router';
import MiCuentaPage from '@/pages/mi-cuenta-page';

export const Route = createFileRoute('/_app/mi-cuenta')({
	component: MiCuentaPage,
});

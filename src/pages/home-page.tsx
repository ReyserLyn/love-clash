import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoveCounts } from '@/hooks/useLoveCounts';
import pb from '@/lib/pocketbase/database';
import { useAuthStore } from '@/stores/auth';

type LoveCountItem = {
	id: string;
	userId: string;
	name: string;
	count: number;
};

export default function HomePage() {
	const { user } = useAuthStore();
	const coupleId = user?.couple;
	const currentUserId = user?.id;
	const queryClient = useQueryClient();

	// 1) Suscripción real‑time solo para confirmar avances
	useEffect(() => {
		if (!coupleId) return;

		const handler = (e: {
			action: string;
			record: { id: string; count?: number; couple: string };
		}) => {
			if (e.action !== 'update' || e.record.couple !== coupleId) return;

			queryClient.setQueryData<LoveCountItem[]>(
				['love-counts', coupleId, currentUserId],
				(old) =>
					old?.map((u) => {
						if (u.id !== e.record.id) return u;
						const serverCount = e.record.count ?? u.count;
						// Solo actualizo si el serverCount es mayor:
						return serverCount > u.count ? { ...u, count: serverCount } : u;
					}) ?? []
			);
		};

		pb.collection('love_counts').subscribe('*', handler);
		return () => {
			pb.collection('love_counts').unsubscribe('*');
		};
	}, [coupleId, currentUserId, queryClient]);

	// 2) Fetch con React Query
	const { data: loveCounts = [], isLoading } = useLoveCounts(
		coupleId,
		currentUserId
	);
	if (isLoading) return <p className='text-center'>Cargando...</p>;

	// 3) Formateo y orden
	const formatted: LoveCountItem[] = loveCounts
		.map((item) => ({
			id: item.id,
			userId: item.expand.user.id,
			name: item.expand.user.name ?? 'Anónimo',
			count: item.count ?? 0,
		}))
		.sort((a, b) =>
			a.userId === currentUserId ? 1 : b.userId === currentUserId ? -1 : 0
		);

	// 4) Optimistic update + PATCH
	const addLove = async (loveCountId: string) => {
		let newCount = 0;
		// 4.1) Optimistic update
		queryClient.setQueryData<LoveCountItem[]>(
			['love-counts', coupleId, currentUserId],
			(old) =>
				old?.map((u) => {
					if (u.id === loveCountId) {
						newCount = u.count + 1;
						return { ...u, count: newCount };
					}
					return u;
				}) ?? []
		);

		// 4.2) Patch real
		try {
			await pb
				.collection('love_counts')
				.update(loveCountId, { count: newCount });
		} catch (error) {
			console.error('Error al añadir amor:', error);
			// 4.3) Revertir si falla
			queryClient.invalidateQueries({
				queryKey: ['love-counts', coupleId, currentUserId],
			});
		}
	};

	// 5) Render
	return (
		<section className='flex flex-col items-center py-8 h-full gap-10'>
			<h1 className='text-3xl text-primary font-potta text-center'>
				¿Quién ama más a quién?
			</h1>

			{formatted.map((u) => {
				const isMe = u.userId === currentUserId;
				return (
					<Card
						key={u.id}
						className={`w-full max-w-md py-12 hover:cursor-pointer ${
							isMe ? 'hover:bg-pink-50' : ''
						}`}
						onClick={() => isMe && addLove(u.id)}
					>
						<CardHeader>
							<CardTitle>
								<h2 className='text-3xl font-bold text-center'>{u.name}</h2>
								<div className='flex flex-col items-center gap-2 justify-center mt-2 relative'>
									<img
										src='/assets/corazon.svg'
										alt='corazón'
										className='max-w-40 animate-pulse'
									/>
									<p className='text-3xl font-bold absolute'>{u.count}</p>
								</div>
							</CardTitle>
						</CardHeader>
					</Card>
				);
			})}
		</section>
	);
}

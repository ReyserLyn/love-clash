import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import LoveList from '@/components/love/love-list';
import { useLoveCounts } from '@/hooks/useLoveCounts';
import type { LoveCountItem } from '@/interfaces/love-count';
import pb from '@/lib/pocketbase/database';
import { useAuthStore } from '@/stores/auth';

export default function HomePage() {
	const { user } = useAuthStore();
	const coupleId = user?.couple;
	const currentUserId = user?.id;
	const queryClient = useQueryClient();

	const [animatingCounts, setAnimatingCounts] = useState(new Set<string>());
	const [pendingUpdates, setPendingUpdates] = useState(new Set<string>());

	const triggerAnimation = useCallback((id: string) => {
		setAnimatingCounts((prev) => new Set(prev).add(id));
		setTimeout(() => {
			setAnimatingCounts((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}, 350);
	}, []);

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
						if (serverCount > u.count) {
							triggerAnimation(u.id);
							return { ...u, count: serverCount };
						}
						return u;
					}) ?? []
			);

			setPendingUpdates((prev) => {
				const next = new Set(prev);
				next.delete(e.record.id);
				return next;
			});
		};

		pb.collection('love_counts').subscribe('*', handler);
		return () => {
			void pb.collection('love_counts').unsubscribe('*');
		};
	}, [coupleId, currentUserId, queryClient, triggerAnimation]);

	const { data: loveCounts = [], isLoading } = useLoveCounts(
		coupleId,
		currentUserId
	);

	if (isLoading) return <p className='text-center'>Cargando...</p>;

	const formatted = loveCounts
		.map((item) => ({
			id: item.id,
			userId: item.expand.user.id,
			name: item.expand.user.name ?? 'Anónimo',
			count: item.count ?? 0,
		}))
		.sort((a, b) =>
			a.userId === currentUserId ? 1 : b.userId === currentUserId ? -1 : 0
		);

	const handleCardClick = async (id: string) => {
		let newCount = 0;
		queryClient.setQueryData<LoveCountItem[]>(
			['love-counts', coupleId, currentUserId],
			(old) =>
				old?.map((u) => {
					if (u.id === id) {
						newCount = u.count + 1;
						return { ...u, count: newCount };
					}
					return u;
				}) ?? []
		);
		triggerAnimation(id);
		setPendingUpdates((prev) => new Set(prev).add(id));

		try {
			await pb.collection('love_counts').update(id, { count: newCount });
		} catch (err) {
			console.error('Error al añadir amor:', err);
			queryClient.invalidateQueries({
				queryKey: ['love-counts', coupleId, currentUserId],
			});
			setPendingUpdates((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}
	};

	return (
		<section className='flex flex-col items-center py-8 h-full gap-8'>
			<h1 className='text-3xl text-primary font-potta text-center'>
				¿Quién ama más a quién?
			</h1>

			<LoveList
				users={formatted}
				currentUserId={currentUserId}
				animatingCounts={animatingCounts}
				pendingUpdates={pendingUpdates}
				onClick={handleCardClick}
			/>
		</section>
	);
}

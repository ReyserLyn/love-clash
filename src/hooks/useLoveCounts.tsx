import { useQuery } from '@tanstack/react-query';
import type {
	LoveCountsResponse,
	UsersResponse,
} from '@/interfaces/pocketbase-types';
import pb from '@/lib/pocketbase/database';

export function useLoveCounts(coupleId: string, currentUserId?: string) {
	return useQuery({
		queryKey: ['love-counts', coupleId, currentUserId],
		enabled: !!coupleId && !!currentUserId,

		queryFn: async () => {
			const loveCounts = await pb.collection('love_counts').getFullList({
				filter: `couple = "${coupleId}"`,
				expand: 'user',
			});

			return loveCounts as LoveCountsResponse<{ user: UsersResponse }>[];
		},

		select: (data) => {
			if (!currentUserId || data.length < 2) return [];

			const user2 = data.find((item) => item.expand.user.id === currentUserId);
			const user1 = data.find((item) => item.expand.user.id !== currentUserId);

			if (!user1 || !user2) return [];

			return [user1, user2];
		},
	});
}

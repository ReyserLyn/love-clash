import { useQuery } from '@tanstack/react-query';
import type {
	LoveCountsResponse,
	UsersResponse,
} from '@/interfaces/pocketbase-types';
import pb from '@/lib/pocketbase/database';

export function useLoveCounts(coupleId?: string, currentUserId?: string) {
	return useQuery({
		queryKey: ['love-counts', coupleId, currentUserId],
		enabled: !!coupleId && !!currentUserId,
		staleTime: 30000,
		gcTime: 300000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		queryFn: async () => {
			try {
				const records = await pb
					.collection('love_counts')
					.getFullList<LoveCountsResponse<{ user: UsersResponse }>>({
						filter: `couple = "${coupleId}"`,
						expand: 'user',
						sort: 'created',
						requestKey: `love-counts-${coupleId}`,
					});

				return records;
			} catch (error) {
				console.error('Error fetching love counts:', error);
				throw error;
			}
		},
	});
}

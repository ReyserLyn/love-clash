import type { LoveCountItem } from '@/interfaces/love-count';
import LoveCard from './love-card';

type Props = {
	users: LoveCountItem[];
	currentUserId?: string;
	animatingCounts: Set<string>;
	pendingUpdates: Set<string>;
	onClick: (id: string) => void;
};

export default function LoveList({
	users,
	currentUserId,
	animatingCounts,
	pendingUpdates,
	onClick,
}: Props) {
	return (
		<div className='flex flex-col items-center gap-4 w-full max-w-md'>
			{users.map((user) => (
				<LoveCard
					key={user.id}
					user={user}
					currentUserId={currentUserId}
					isAnimating={animatingCounts.has(user.id)}
					hasPending={pendingUpdates.has(user.id)}
					onClick={() => onClick(user.id)}
				/>
			))}
		</div>
	);
}

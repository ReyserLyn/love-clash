import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { LoveCountItem } from '@/interfaces/love-count';

type Props = {
	user: LoveCountItem;
	currentUserId?: string;
	isAnimating: boolean;
	hasPending: boolean;
	onClick?: () => void;
};

export default function LoveCard({
	user,
	currentUserId,
	isAnimating,
	hasPending,
	onClick,
}: Props) {
	const isMe = user.userId === currentUserId;

	return (
		<Card
			onClick={() => isMe && onClick?.()}
			className={`w-full max-w-md py-12 transition-all duration-200 ${
				isMe
					? 'hover:bg-pink-50 hover:cursor-pointer hover:scale-105 active:scale-95'
					: ''
			} ${isAnimating ? 'ring-2 ring-pink-300 bg-pink-25' : ''} ${
				hasPending ? 'bg-pink-25/50' : ''
			}`}
		>
			<CardHeader>
				<CardTitle>
					<h2 className='text-3xl font-bold text-center'>{user.name}</h2>
					<div className='flex flex-col items-center gap-2 justify-center mt-2 relative'>
						<img
							src='/assets/corazon.svg'
							alt='corazón'
							className={`max-w-40 transition-transform duration-300 ${
								isAnimating ? 'animate-pulse scale-110' : 'animate-pulse'
							}`}
						/>
						<p
							className={`text-3xl font-bold absolute transition-all duration-300 ${
								isAnimating
									? 'text-pink-600 scale-125 drop-shadow-lg'
									: 'text-current'
							}`}
						>
							{user.count}
						</p>
					</div>
					{isMe && (
						<p className='text-sm text-center text-gray-500 mt-2'>
							Toca para añadir amor 💕
						</p>
					)}
				</CardTitle>
			</CardHeader>
		</Card>
	);
}

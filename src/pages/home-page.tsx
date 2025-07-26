import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoveCounts } from '@/hooks/useLoveCounts';
import { useAuthStore } from '@/stores/auth';

export default function HomePage() {
	const { user } = useAuthStore();
	const coupleId = user?.couple ?? '';
	const currentUserId = user?.id;

	const { data: loveCounts = [], isLoading } = useLoveCounts(
		coupleId,
		currentUserId
	);

	if (isLoading) {
		return <p className='text-center'>Cargando...</p>;
	}

	const [user1, user2] = loveCounts.map((item) => ({
		name: item.expand.user.name ?? 'Anónimo',
		count: item.count,
	}));

	console.log(user1, user2);

	return (
		<section className='flex flex-col items-center py-8 h-full gap-10'>
			<h1 className='text-3xl text-primary font-potta text-center'>
				¿Quién ama más a quién?
			</h1>

			{[user1, user2].map((user, i) => (
				<Card key={i} className='w-full max-w-md py-12'>
					<CardHeader>
						<CardTitle>
							<h2 className='text-3xl font-bold text-center'>{user.name}</h2>
							<div className='flex flex-col items-center gap-2 justify-center mt-2 relative'>
								<img
									src='/assets/corazon.svg'
									alt='corazón'
									className='max-w-40 animate-pulse'
								/>
								<p className='text-3xl font-bold absolute'>{user.count}</p>
							</div>
						</CardTitle>
					</CardHeader>
				</Card>
			))}
		</section>
	);
}

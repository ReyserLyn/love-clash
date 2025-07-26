import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
	return (
		<section className='container flex flex-col items-center justify-center h-[100dvh]'>
			<div className='h-[80%] flex flex-col items-center justify-center gap-10'>
				<div className='text-center font-potta flex flex-col gap-2 relative'>
					<h1 className='text-4xl font-bold  text-primary'>LOVE VS</h1>
					<img
						src='/assets/trace-corazon.svg'
						alt='trace-corazon'
						className='w-[8%] absolute -top-3 left-8'
					/>
					<div className='flex flex-col'>
						<p className='text-sm text-muted-foreground '>¿Quién ama más?</p>
						<p className='text-xs text-accent'>Hecho para ti, Marilyn♡</p>
					</div>
				</div>

				<div className='flex items-center justify-center gap-4 relative'>
					<img src='/assets/corazon.svg' alt='corazon' className='w-full' />

					<img
						src='/assets/pareja.png'
						alt='pareja'
						className='w-[90%] absolute top-3'
					/>
				</div>
			</div>

			<div className='h-[10%]'>
				<Button size='lg' className='w-48' asChild>
					<Link to='/login'>
						<img src='/assets/corazon.svg' alt='corazon' className='w-4' />
						Iniciar sesión
					</Link>
				</Button>
			</div>
		</section>
	);
}

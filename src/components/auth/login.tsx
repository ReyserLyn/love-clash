import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { User } from '@/interfaces';
import pb from '@/lib/pocketbase/database';
import { useAuthStore } from '@/stores/auth';
import { PasswordField, passwordSchema } from '../form/password-field';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';

const formSchema = z.object({
	email: z.email({ message: 'Email inválido' }),
	password: passwordSchema,
});

export default function Login() {
	const { setAuth } = useAuthStore();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log('Submitting with values:', values);
		try {
			console.log('Submitting with values:', values);
			const res = await pb
				.collection('users')
				.authWithPassword(values.email, values.password, { requestKey: null });

			const user = res.record as User;
			const token = pb.authStore.token;

			console.log('Login success:', user, token);
			console.log('Origin:', window.location.origin);

			await setAuth(user, token);
			navigate({ to: '/' });
		} catch (error) {
			console.error('Login failed:', error);
			alert('Credenciales incorrectas o error del servidor');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='pb-4'>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input placeholder='Example@email.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<PasswordField />

				<Button type='submit' className='w-full mt-4'>
					Iniciar sesión
				</Button>
			</form>
		</Form>
	);
}

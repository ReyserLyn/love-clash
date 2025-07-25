import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
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
	const { mutate } = useAuth();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate(
			{ email: values.email, password: values.password },
			{
				onSuccess: () => {
					toast.success('Inicio de sesión exitoso');
					navigate({ to: '/' });
				},
				onError: (err) => {
					toast.error('Credenciales incorrectas o error del servidor');
					console.error('Login failed:', err);
				},
			}
		);
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

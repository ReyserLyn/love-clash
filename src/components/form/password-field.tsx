import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { createElement, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Box } from '@/components/ui/box';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type PasswordFieldProps = {
	name?: string;
	label?: string;
	placeholder?: string;
	description?: string | JSX.Element;
};

export const passwordSchema = z
	.string()
	.min(1, { message: 'La contraseña no puede estar vacía.' })
	.regex(/^.{8,20}$/, {
		message: 'Mínimo 8 y máximo 25 caracteres.',
	});

export function PasswordField({
	name = 'password',
	label = 'Contraseña',
	placeholder = '●●●●●●●●',
	description,
}: PasswordFieldProps) {
	const { control, getFieldState } = useFormContext();
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Box className='relative'>
							<Input
								{...field}
								type={passwordVisibility ? 'text' : 'password'}
								autoComplete='on'
								placeholder={placeholder}
								className={`pr-12 ${
									getFieldState(name).error && 'text-destructive'
								}`}
							/>
							<Box
								className='absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground'
								onClick={() => setPasswordVisibility(!passwordVisibility)}
							>
								{createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
									className: 'h-6 w-6',
								})}
							</Box>
						</Box>
					</FormControl>
					<FormMessage />
					{description && <FormDescription>{description}</FormDescription>}
				</FormItem>
			)}
		/>
	);
}

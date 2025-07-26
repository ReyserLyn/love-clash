import { LazyStore } from '@tauri-apps/plugin-store';
import { create } from 'zustand';
import type { User } from '@/interfaces';
import pb from '@/lib/pocketbase/database';

const store = new LazyStore('auth.json');

interface AuthState {
	user: User | null;
	token: string | null;
	setAuth: (user: User, token: string) => Promise<void>;
	restoreAuth: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	token: null,

	async setAuth(user, token) {
		await store.set('user', user);
		await store.set('token', token);
		await store.save();
		set({ user, token });
	},

	async restoreAuth() {
		const user = await store.get<User>('user');
		const token = await store.get<string>('token');

		set({ user: user ?? null, token: token ?? null });
	},

	async logout() {
		await store.clear();
		await store.save();
		set({ user: null, token: null });
		pb.authStore.clear();
	},
}));

store.onKeyChange('token', (val) => {
	console.log('Token changed:', val);
});

store.onKeyChange('user', (val) => {
	console.log('User changed:', val);
});

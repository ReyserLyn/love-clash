import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '@/interfaces/pocketbase-types';

const pb = new PocketBase(
	import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase;
pb.autoCancellation(false);

export default pb;

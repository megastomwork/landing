import { createDirectus, rest } from '@directus/sdk';
import { CONFIG } from '@/shared/constants/config.constants';

const client = createDirectus(CONFIG.BACKEND_URL).with(rest());

export default client;

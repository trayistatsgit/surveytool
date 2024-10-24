import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateCookieId = (): string => {
	let cookieId = Cookies.get('cookieId');
	if (!cookieId) {
		// const isDevelopment = process.env.NODE_ENV === 'development'; // Check if in development environment
		cookieId = uuidv4();
		Cookies.set('cookieId', cookieId, {
			expires: 365,
			secure: false,
			sameSite: 'none',
		});
	}

	return cookieId;
};

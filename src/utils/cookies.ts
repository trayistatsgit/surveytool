import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateCookieId = (): string => {
	// Check if the cookie exists
	let cookieId = Cookies.get('cookieId');

	// If the cookie does not exist, generate a new unique ID and set the cookie
	if (!cookieId) {
		const isDevelopment = process.env.NODE_ENV === 'development'; // Check if in development environment
		console.log(isDevelopment);
		cookieId = uuidv4(); // Generate a new unique ID
		Cookies.set('cookieId', cookieId, {
			expires: 60, // expires in 7 days
			secure: false, // ensures the cookie is only sent over HTTPS
			sameSite: 'none',
		});
	}

	console.log('User Cookie ID:', cookieId);
	return cookieId;
};

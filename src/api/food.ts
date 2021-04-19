import axios from 'axios';
import { useCurrentUser } from '../hooks/auth';

const instance = axios.create({
	baseURL: 'https://daily-recipes.herokuapp.com/'
});

instance.interceptors.request.use(
	async config => {
		const token = await useCurrentUser()?.getIdToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

export default instance;

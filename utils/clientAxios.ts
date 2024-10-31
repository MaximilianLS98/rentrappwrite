import axios from 'axios';

export const axiosInstanceClient = axios.create({
	baseURL: 'http://localhost:3000/api',
});

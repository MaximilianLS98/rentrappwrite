import axios from 'axios';

const internalEndpoint =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000/'
		: 'http://localhost:3000/' // process.env.INTERNAL_API_ENDPOINT;

console.log(`internalEndpoint: ${internalEndpoint}`);


export const axiosInstanceClient = axios.create({
	baseURL: internalEndpoint,
});

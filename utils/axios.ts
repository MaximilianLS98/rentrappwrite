import axios from 'axios';
// This breaks the build command, because cookies() must be called from a page or API route
// import { cookies } from 'next/headers';

const internalEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : process.env.INTERNAL_API_ENDPOINT;

console.log(`internalEndpoint: ${internalEndpoint}`);

export const axiosInstance = axios.create({
    baseURL: internalEndpoint,
    // headers: {
    //     cookie: `session=${cookies().get('session')?.value}`
    // }
});

export const createClient = () => {
    return axios.create({
        baseURL: internalEndpoint,
        // headers: {
        //     cookie: `session=${cookies().get('session')?.value}`
        // }
    });
};


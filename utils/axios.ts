import axios from 'axios';
// This breaks the build command, because cookies() must be called from a page or API route
// import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    // headers: {
    //     cookie: `session=${cookies().get('session')?.value}`
    // }
});

export const createClient = () => {
    return axios.create({
        baseURL: 'http://localhost:3000/api',
        // headers: {
        //     cookie: `session=${cookies().get('session')?.value}`
        // }
    });
};


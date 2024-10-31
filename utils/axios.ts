import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        cookie: `session=${cookies().get('session')?.value}`
    }
});

export const createClient = () => {
    return axios.create({
        baseURL: 'http://localhost:3000/api',
        headers: {
            cookie: `session=${cookies().get('session')?.value}`
        }
    });
};


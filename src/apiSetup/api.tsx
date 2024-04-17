import axios, {AxiosResponse} from 'axios';


const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
        'accept': 'text/html',
    },
};

export const instance = axios.create(defaultOptions);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
    get: (url: string, params?: any) => instance.get(url, {params}).then(responseBody).catch(error => {
        throw error;
    }),
    post: (url: string, body: {}, customHeaders?: any) => instance.post(url, body, customHeaders).then(responseBody).catch(error => {
        throw error;
    }),
    put: (url: string, body: {}, customHeaders?: any) => instance.put(url, body, customHeaders).then(responseBody).catch(error => {
        throw error;
    }),
    delete: (url: string) => instance.delete(url).then(responseBody).catch(error => {
        throw error;
    }),
};
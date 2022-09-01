import axios, { AxiosError } from 'axios';
import { CONFIG } from '../core/config';

import Cookies from 'universal-cookie';
import { CONSTANT } from '../core/constant';
import _get from 'lodash.get';
import { useApiStore } from '@/stores/apiStore';
const http = axios.create({
    baseURL: CONFIG.SERVER_URL,
    withCredentials: true,
});
http.interceptors.request.use(function (req) {
    const apiStore = useApiStore();
    apiStore.handleOnReset();
    const cookies = new Cookies();
    const token = cookies.get(CONSTANT.TOKEN_COOKIE_KEY) || '';
    if (token && req.headers) req.headers[CONSTANT.TOKEN_HEADER_KEY] = `${token}`;

    return req;
});
http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error: AxiosError) {
        const apiStore = useApiStore();
        if (error.response) {
            apiStore.handleOnUpdateMessage(error.response.data);
        }
        return Promise.reject(error.response);
    }
);

export { http };

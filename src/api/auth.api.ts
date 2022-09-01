import { http } from './http';

export interface ILoginUser {
    email: string;
    password: string;
}

export const authApi = {
    loginGoogle: async (token: string) => {
        try {
            const res = await http.get<{ token: string }>(`/auth/google?credential=${token}`);
            return res.data.token;
        } catch (error) {
            return '';
        }
    },
    loginUser: async (input: ILoginUser) => {
        try {
            const res = await http.post<{ token: string }>('/auth/login', input);
            return res.data;
        } catch (error) {
            return null;
        }
    }
};

import type { User } from '../models';
import { http } from './http';

export interface UpdateUserDto extends Pick<User, 'name'> {}

export const userApi = {
    loginGoogle: async (token: string) => {
        try {
            const res = await http.get<{ token: string }>(`/auth/google?credential=${token}`);
            return res.data.token;
        } catch (error) {
            return '';
        }
    },
    getMe: async () => {
        const res = await http.get<User>('/user/me');
        return res.data;
    },

    updateMe: async (data: UpdateUserDto) => {
        const res = await http.put<User>('/user/me', data);
        return res.data;
    }
};

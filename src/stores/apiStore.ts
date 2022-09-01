import { defineStore } from 'pinia';

export const useApiStore = defineStore({
    id: 'apiStore',
    state: (): { errors: Record<string, string> } => ({
        errors: {},
    }),
    getters: {
        getMessage: (state) => (field: string) => {
            return state.errors[field] || '';
        },
    },
    actions: {
        handleOnUpdateMessage(updateMessage: any) {
            this.errors = updateMessage;
        },

        handleOnReset() {
            this.errors = {};
        },
    },
});

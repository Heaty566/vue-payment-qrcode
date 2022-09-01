import { ref } from 'vue';

export const useLoading = () => {
    const loadings = ref<Record<string, boolean>>({
        default: false,
    });

    const handleStartLoading = (key = 'default') => {
        loadings.value[key] = true;
    };

    const handleOnEndLoading = (key = 'default') => {
        loadings.value[key] = false;
    };

    return { handleStartLoading, handleOnEndLoading, loadings };
};

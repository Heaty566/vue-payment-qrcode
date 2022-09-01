export interface IUseForm<T> {
    defaultValues: T;
}

export interface IUseFormRegister {
    key: string;
    value: any;
}

export const useForm = <T>({ defaultValues }: IUseForm<T>) => {
    const formValues = { ...defaultValues };
    const register = ({ key, value }: IUseFormRegister) => {
        formValues[key as keyof T] = value;
    };

    return { formValues, register };
};

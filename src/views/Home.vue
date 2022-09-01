<script setup lang="ts">
import { InputField, FormBtn, SelectField } from '../components/form';
import { authApi } from '../api/auth.api';
import { useForm } from '@/components/form/formHelper';
import { useLoading } from '@/utils/useLoading';
import { Banks } from '../core/qrcode/constants/banks';

import QrcodeVue from 'qrcode.vue';
import { BankKey, QRCodeGenerator } from '@/core/qrcode';
import { ref } from 'vue';
const bankOptions = Banks.map((bank) => ({
    value: bank.key,
    label: bank.name,
}));

interface IForm {
    bankKey: string;
    amount: number;
    accountNumber: string;
    content: string;
}

const form = useForm<IForm>({ defaultValues: { bankKey: bankOptions[0].value, accountNumber: '', amount: 50000, content: '' } });
const { handleOnEndLoading, handleStartLoading, loadings } = useLoading();
const qrvalue = ref('');
const handleSubmmit = async () => {
    console.log(form.formValues);
    const qrcode = new QRCodeGenerator();
    const value = qrcode.createQrCode({
        amount: form.formValues.amount,
        bankNumber: form.formValues.accountNumber,
        bankKey: form.formValues.bankKey as BankKey,
        content: form.formValues.content,
    });
    qrvalue.value = value;
};
</script>

<template>
    <div class="flex justify-center space-x-4">
        <div class="space-y-2">
            <div class="px-4 py-8 bg-white border rounded-md shadow-lg">
                <h1 class="mb-6 text-xl font-semibold">Create New QR Payment</h1>
                <form @submit.prevent="handleSubmmit" class="space-y-4">
                    <SelectField name="bankKey" label="Bank" @register="form.register" :options="bankOptions" :value="form.formValues.bankKey" />
                    <InputField name="accountNumber" label="Account Number" @register="form.register" :value="form.formValues.accountNumber" />
                    <InputField name="amount" label="Amount" type="number" @register="form.register" :value="form.formValues.amount" />
                    <InputField name="content" label="Content" @register="form.register" :value="form.formValues.content" />

                    <FormBtn v-if="!loadings.default" name="formBtn" label="Create" />
                </form>
            </div>
        </div>
        <div>
            <QrcodeVue :size="200" :value="qrvalue"></QrcodeVue>
        </div>
    </div>
</template>

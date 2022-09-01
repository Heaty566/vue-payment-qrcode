import { FieldID, Consumer, AdditionalData, BankKey, Banks, Prodiver } from './constants';
import { crc16ccitt } from './crc16';
export class QRCodeGenerator {
    private version = '01';
    private initMethod = '12';
    private provider: Prodiver = {
        fieldId: '38',
        guid: 'A000000727',
        name: 'VIETQR',
        service: 'QRIBFTTA',
    };
    private consumer: Consumer;
    private currency = '704';
    private amount: string;
    private nation = 'VN';
    private additionalData: AdditionalData;

    public createQrCode({ amount, bankKey, bankNumber, content }: { amount: number; bankKey: BankKey; bankNumber: string; content: string }): string {
        const bank = Banks.find((item) => item.key === bankKey);
        if (bank) {
            this.amount = amount.toString();
            this.consumer = {
                bankBin: bank.bin,
                bankNumber: bankNumber,
            };
            this.additionalData = {
                purpose: content,
            };

            return this.build();
        }
        return '';
    }

    private build(): string {
        const version = this.genFieldData(FieldID.VERSION, this.version);
        const initMethod = this.genFieldData(FieldID.INIT_METHOD, this.initMethod);
        const guid = this.genFieldData(FieldID.GUID, this.provider.guid);
        const bankBin = this.genFieldData(FieldID.BANK_BIN, this.consumer.bankBin);
        const currency = this.genFieldData(FieldID.CURRENCY, this.currency);
        const amountStr = this.genFieldData(FieldID.AMOUNT, this.amount);
        const nation = this.genFieldData(FieldID.NATION, this.nation);
        const purpose = this.genFieldData(FieldID.PURPOSE_OF_TRANSACTION, this.additionalData.purpose);
        const bankNumber = this.genFieldData(FieldID.BANK_NUMBER, this.consumer.bankNumber);
        const providerDataContent = bankBin + bankNumber;
        const provider = this.genFieldData(FieldID.DATA, providerDataContent);
        const service = this.genFieldData(FieldID.SERVICE, this.provider.service);
        const providerData = this.genFieldData(this.provider.fieldId, guid + provider + service);
        const additionalData = this.genFieldData(FieldID.ADDITIONAL_DATA, purpose);
        const content = `${version}${initMethod}${providerData}${currency}${amountStr}${nation}${additionalData}${FieldID.CRC}04`;
        const crc = this.genCRCCode(content);
        return content + crc;
    }

    private genCRCCode(content: string): string {
        const crcCode: string = crc16ccitt(content).toString(16).toUpperCase();
        return `0000${crcCode}`.slice(-4);
    }

    private genFieldData(id = '', value = ''): string {
        if (id.length !== 2 || value.length <= 0) return '';
        const length = `00${value.length}`.slice(-2);
        return `${id}${length}${value}`;
    }
}

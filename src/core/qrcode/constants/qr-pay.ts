export enum FieldID {
    VERSION = '00',
    INIT_METHOD = '01',
    VIETQR = '38',
    CURRENCY = '53',
    AMOUNT = '54',
    NATION = '58',
    ADDITIONAL_DATA = '62',
    CRC = '63',
    GUID = '00',
    DATA = '01',
    SERVICE = '02',
    BANK_BIN = '00',
    BANK_NUMBER = '01',
    PURPOSE_OF_TRANSACTION = '08',
}

export class Prodiver {
    fieldId: string;
    name: string;
    guid: string;
    service: string;
    constructor() {
        this.fieldId = '';
        this.name = '';
        this.guid = '';
        this.service = '';
    }
}

export class AdditionalData {
    purpose: string;
    constructor() {
        this.purpose = '';
    }
}

export class Consumer {
    bankBin: string;
    bankNumber: string;
    constructor() {
        this.bankBin = '';
        this.bankNumber = '';
    }
}

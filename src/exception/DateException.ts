export default class DateException extends Error {

    constructor() {
        super('Date is not valid')
    }

    static checkDate(date: string): boolean {
        const reg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        return (!reg.test(date.toLowerCase().trim()))
    }

    static checkDateTime(date: string): boolean {
        const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
        return (!reg.test(date.toLowerCase().trim()))
    }
}
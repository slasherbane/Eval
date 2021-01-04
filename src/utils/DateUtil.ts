export class DateUtil {
// code internet ATTENTION

   // verifie si la date respecte le format yyyy-mm-dd dans la limite normal xxxx-12-31
    static isValidDate(d: string): boolean {     
            const reg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
            return (reg.test(d.toLowerCase().trim()))    
    }

    //verifie et formate une date
    static formatDate(date: any): string {
        const datetime = new Date(date);      
        return DateUtil.isValidDate(date) ? DateUtil.formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
    }

    // formate une date avec un zero si besoin pour la bdd
    static formatDatetime(date: Date, format: string) {
        const _padStart = (value: number): string => value.toString().padStart(2, '0');
        return format
            .replace(/yyyy/g, _padStart(date.getFullYear()))
            .replace(/dd/g, _padStart(date.getDate()))
            .replace(/mm/g, _padStart(date.getMonth() + 1))
            .replace(/hh/g, _padStart(date.getHours()))
            .replace(/ii/g, _padStart(date.getMinutes()))
            .replace(/ss/g, _padStart(date.getSeconds()));
    }

}
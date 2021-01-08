export class DateUtil {

    static isValidDate(d: string): boolean {
      
            const reg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
            return (reg.test(d.toLowerCase().trim()))
    
    
    }
    static formatDate(date: any): string {
        var datetime = new Date(date);
         
        return DateUtil.isValidDate(date) ? DateUtil.formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
    }


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
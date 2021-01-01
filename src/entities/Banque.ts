export default class Banque {
     id: number | null;
     cartNumber: number;
     month: Date;
     year: Date;
      






    constructor(id: number | null, cartNumber: number, month: Date, year: Date) {
        this.id = id;
        this.cartNumber = cartNumber;
        this.month = month;
        this.year = year;
    }
    

    /**
     * Getter $id
     * @return {number | null}
     */
    public get $id(): number | null {
        return this.id;
    }

    /**
     * Setter $id
     * @param {number | null} value
     */
    public set $id(value: number | null) {
        this.id = value;
    }

    /**
     * Getter $cartNumber
     * @return {string}
     */
    public get $cartNumber(): number {
        return this.cartNumber;
    }

    /**
     * Setter $cartNumber
     * @param {string} value
     */
    public set $cartNumber(value: number) {
        this.cartNumber = value;

    }

     /**
     * Getter $month
     * @return {string}
     */
    public get $month(): Date {
        return this.month;
    }

    /**
     * Setter $month
     * @param {string} value
     */
    public set $month(value: Date) {
        this.month = value;

    }

     /**
     * Getter $year
     * @return {string}
     */
    public get $year(): Date {
        return this.year;
    }

    /**
     * Setter $month
     * @param {string} value
     */
    public set $year(value: Date) {
        this.year = value;

    }



}

  


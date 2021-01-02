export default class Util {
    static checkVal(value: string) {
        return (!value || value.length === 0 || value === undefined) ? true : false;
    }

    static split = (token: string) => { return token.split('Bearer ').join('') }
}
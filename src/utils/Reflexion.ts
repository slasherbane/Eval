export default class Reflexion {

    // recupere les propriete en fonction de leur visibilite. ici uniquement private 
    // cette fonction retourne donc toute les propriété d'une classe avec des attributs privés.
    public static getFields(Class: any): string[] {
       const reflect = Reflect.ownKeys(Class.prototype).filter(name => {
            const a = Reflect.getOwnPropertyDescriptor(Class.prototype, name)
            if (a === undefined) {
                return;
            }
            return typeof a["get"] === "function";
        }) as string[];
        let reflexionNorm: string[] = [];
        reflect.forEach((element) => {
            reflexionNorm.push(element.substring(1, element.length));
        })
        return reflexionNorm;
    }
}
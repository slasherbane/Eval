export default class Role {
    private id: number | null;
    private nom: string;






    constructor(id: number | null, nom: string) {
        this.id = id;
        this.nom = nom;
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
     * Getter $nom
     * @return {string}
     */
    public get $nom(): string {
        return this.nom;
    }

    /**
     * Setter $nom
     * @param {string} value
     */
    public set $nom(value: string) {
        this.nom = value;

    }


}








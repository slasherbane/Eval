export default class User {
    id : null | number;
    firstname: string;
    lastname: string;
    password: string;
    RIB: number;


    constructor( $id :null| number , $firstname: string, $lastname: string, $email: string, $password: string, $RIB: number,) {
        this.id = $id;
        this.firstname = $firstname;
        this.lastname = $lastname;
        this.password = $password;
        this.RIB = $RIB;
        
    }


    /**
   * Getter $firstname
   * @return {string}
   */
    public get $firstname(): string {
        return this.firstname;
    }

    /**
     * Setter $firstname
     * @param {string} value
     */
    public set $firstname(value: string) {
        this.firstname = value;
    }

    /**
     * Getter $lastname
     * @return {string}
     */
    public get $lastname(): string {
        return this.lastname;
    }

    /**
     * Setter $lastname
     * @param {string} value
     */
    public set $lastname(value: string) {
        this.lastname = value;
    }


    /**
     * Getter $password
     * @return {string}
     */
    public get $password(): string {
        return this.password;
    }

    /**
     * Setter $password
     * @param {string} value
     */
    public set $password(value: string) {
        this.password = value;
    }


    /**
     * Getter $RIB
     * @return {null | string}
     */
    public get $RIB(): number {
        return this.RIB;
    }

    /**
     * Setter $date_naissance
     * @param {null|string } value
     */
    public set $RIB(value: number) {
        this.RIB = value;
    }



  
    /**
     * Getter $id
     * @return {null }
     */
	public get $id(): null | number {
		return this.id;
	}

    /**
     * Setter $id
     * @param {null } value
     */
	public set $id(value: null | number ) {
		this.id = value;
	}
    
    public static getGetters(): string[] {
        return Reflect.ownKeys(this.prototype).filter(name => {

           let a =  Reflect.getOwnPropertyDescriptor(this.prototype, name)
            if(a === undefined){
                return ;
            }
            return typeof a["get"] === "function" ;
        }) as string[];
    } }
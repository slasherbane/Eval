import Role from "./Role";
import { DateUtil } from '../utils/DateUtil';

export default class User {
    private id : null | number;
    private firstname: string;
    private lastname: string;
    private email: string;
    private password: string;
    private date_naissance: null | string;
    private role: Role;
    private sexe: string;
    private subscription:number;
    private createdAt:string;
    private updatedAt:null|string;



    constructor( id :null| number , $firstname: string, $lastname: string, $email: string, $password: string, $date_naissance: null|string, $role: Role, $sexe: string) {
        this.id = id;
        this.firstname = $firstname;
        this.lastname = $lastname;
        this.email = $email;
        this.password = $password;
        this.date_naissance = $date_naissance;
        this.role = $role;
        this.sexe = $sexe;
        let d :Date = new Date();
        this.subscription = 0;
        this.createdAt  = DateUtil.formatDatetime(d,'yyyy-mm-dd');
     
    console.log(this.createdAt);
        this.updatedAt = null;
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
     * Getter $email
     * @return {string}
     */
    public get $email(): string {
        return this.email;
    }

    /**
     * Setter $email
     * @param {string} value
     */
    public set $email(value: string) {
        this.email = value;
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
     * Getter $date_naissance
     * @return {null | string}
     */
    public get $date_naissance(): null | string {
        return this.date_naissance;
    }

    /**
     * Setter $date_naissance
     * @param {null|string } value
     */
    public set $date_naissance(value: null | string) {
        this.date_naissance = value;
    }



    /**
     * Getter $role
     * @return {Role}
     */
    public get $role(): Role {
        return this.role;
    }

    /**
     * Setter $role
     * @param {Role} value
     */
    public set $role(value: Role) {
        this.role = value;
    }


    /**
     * Getter $sexe
     * @return {string}
     */
    public get $sexe(): string {
        return this.sexe;
    }

    /**
     * Setter $sexe
     * @param {string} value
     */
    public set $sexe(value: string) {
        this.sexe = value;
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
    }


    /**
     * Getter $subscription
     * @return {number}
     */
	public get $subscription(): number {
		return this.subscription;
	}

    /**
     * Setter $subscription
     * @param {number} value
     */
	public set $subscription(value: number) {
		this.subscription = value;
    }
    

    /**
     * Getter $createdAt
     * @return {string}
     */
	public get $createdAt(): string {
		return this.createdAt;
	}

    /**
     * Setter $createdAt
     * @param {string} value
     */
	public set $createdAt(value: string) {
		this.createdAt = value;
    }
    

    /**
     * Getter $updatedAt
     * @return {null}
     */
	public get $updatedAt(): null | string{
		return this.updatedAt;
	}

    /**
     * Setter $updatedAt
     * @param {null} value
     */
	public set $updatedAt(value: null|string) {
		this.updatedAt = value;
	}




    public getPropertiesRegisterValues(){
        let data = []
        data.push(this.$firstname)
        data.push(this.lastname);
        data.push(this.email);
        data.push(this.password);
        data.push(this.date_naissance);
        data.push(this.role.$id);
        data.push(this.sexe);
        data.push(this.subscription);
        data.push(this.createdAt);
        return data;
    }

 












}
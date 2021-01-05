
import { DateUtil } from '../utils/DateUtil';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { jsonIgnoreReplacer, jsonIgnore, jsonReplaceByConstant } from 'json-ignore';
@Entity()
@Unique("email",["email"])
export default class User {


    @jsonIgnore()
    @PrimaryGeneratedColumn()
    private id: null | number;
    @Column()
    private firstname: string;
    @Column()
    private lastname: string;
    @Column({name: 'email',type:"varchar",length:"155"})
    private email: string;
    @Column()
    private password: string;
    @Column({type: "date", nullable: true})
    private date_naissance: null | Date;
    @Column()
    private role: string;
    @Column()
    private sexe: string;
    @Column()
    private subscription: number;
    @Column({type: "datetime", nullable: false})
    private createdAt: Date;
    @Column({type: "datetime", nullable: true})
    private updatedAt: null | Date;
    @jsonIgnore()
    @Column()
    private try: number;
    @jsonIgnore()
    @Column({name: 'parent',type:"int" , nullable:true})
    private parent: number | null;
    @jsonIgnore()
    @Column()
    private connected:boolean;

    public static exclusionInsertField: string[] = ["id", "updatedAt", "parent","connected"];
    public static nonRequiredField: string[] = ["id", "role", "subscription", "createdAt", "updatedAt", "try", "parent","connected"];



    constructor($id: null | number, $firstname: string, $lastname: string, $email: string, $password: string, $date_naissance: null | Date, $role: string, $sexe: string,subscription:number, createdAt: null | Date, updatedAt: null | Date, atry: number, parent: null | number) {
        this.id = $id;
        this.firstname = $firstname;
        this.lastname = $lastname;
        this.email = $email;
        this.password = $password;
        this.date_naissance = $date_naissance;
        this.role = $role;
        this.sexe = $sexe;
        this.subscription = subscription;
        if (createdAt === null) {         
            this.createdAt = new Date();
        }else{
            this.createdAt = createdAt;
        }
        this.updatedAt = updatedAt;
        this.try = atry;
        this.parent = parent;
        this.connected = false;

    }

    /**
     * Getter $id
     * @return {null |number }
     */
    public get $id(): null | number {
        return this.id;
    }

    /**
     * Setter $id
     * @param {null |number} value
     */
    public set $id(value: null | number) {
        this.id = value;
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
    public get $date_naissance(): null | Date{
        return this.date_naissance;
    }

    /**
     * Setter $date_naissance
     * @param {null|string } value
     */
    public set $date_naissance(value: null | Date) {
        this.date_naissance = value;
    }



    /**
     * Getter $role
     * @return {Role}
     */
    public get $role(): string {
        return this.role;
    }

    /**
     * Setter $role
     * @param {Role} value
     */
    public set $role(value: string) {
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
    public get $createdAt(): Date {
        return this.createdAt;
    }

    /**
     * Setter $createdAt
     * @param {string} value
     */
    public set $createdAt(value: Date) {
        this.createdAt = value;
    }

    /**
     * Getter $updatedAt
     * @return {null}
     */
    public get $updatedAt(): null | Date{
        return this.updatedAt;
    }

    /**
     * Setter $updatedAt
     * @param {null} value
     */
    public set $updatedAt(value: null | Date) {
        this.updatedAt = value;
    }

    /**
     * Getter $try
     * @return {number}
     */
    public get $try(): number {
        return this.try;
    }

    /**
     * Setter $try
     * @param {number} value
     */
    public set $try(value: number) {
        this.try = value;
    }

    /**
     * Getter $parent
     * @return {User}
     */
    public get $parent(): number | null {
        return this.parent;
    }

    /**
     * Setter $parent
     * @param {User} value
     */
    public set $parent(value: number | null) {
        this.parent = value;
    }

    /**
     * Getter $connected
     * @return {boolean}
     */
	public get $connected(): boolean {
		return this.connected;
	}

    /**
     * Setter $connected
     * @param {boolean} value
     */
	public set $connected(value: boolean) {
		this.connected = value;
    }
    
    public static getGetters(): string[] {
        return Reflect.ownKeys(this.prototype).filter(name => {

            let a = Reflect.getOwnPropertyDescriptor(this.prototype, name)
            if (a === undefined) {
                return;
            }
            return typeof a["get"] === "function";
        }) as string[];
    }






















}
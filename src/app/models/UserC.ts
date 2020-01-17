import { Person } from './person';

export class UserC {

    userC_id: number;
    username: string;
    email: string;
    password: string;
    is_admin:boolean;
    is_superuser:boolean;
    person_id: Person;

    constructor(userC_id?: number, username?: string,email?: string, password?: string, person_id?:Person,is_admin?:boolean,is_superuser?:boolean){
        this.userC_id = userC_id,
        this.username = username,
        this.email = email,
        this.password = password,
        this.is_admin=is_admin,
        this.is_superuser=is_superuser,
        this.person_id = person_id        
    }

}
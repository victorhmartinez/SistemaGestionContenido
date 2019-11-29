import { Person } from './person';

export class UserC {

    userC_id: number;
    username: string;
    email: string;
    password: string;
    person_id: Person;

    constructor(userC_id?: number, username?: string,email?: string, password?: string, person_id?:Person){
        this.userC_id = userC_id,
        this.username = username,
        this.email = email,
        this.password = password,
        this.person_id = person_id        
    }

}
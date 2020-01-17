import { Person } from './person';

export class UserC {

    user_id: number;
    username: string;
    email: string;
    password: string;
    person_id: Person;

    constructor(user_id?: number, username?: string,email?: string, password?: string, person_id?:Person){
        this.user_id = user_id,
        this.username = username,
        this.email = email,
        this.password = password,
        this.person_id = person_id        
    }

}
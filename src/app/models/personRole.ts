import { Person } from './person';
import { ItemCategory } from './itemCategory';
import { Role } from './role';

export class PersonRole {

    person_role_id: number;
    university_carrer: ItemCategory;
    role_id : Role;
    person_id: Person;

    constructor(person_role_id?: number, university_carrer?: ItemCategory, role_id?: Role, person_id?: Person ){
        this.person_role_id = person_role_id,
        this.university_carrer = university_carrer,
        this.role_id = role_id,
        this.person_id = person_id  
    }

}
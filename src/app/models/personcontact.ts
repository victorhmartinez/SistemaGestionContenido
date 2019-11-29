import { Person } from './person';
import { ItemCategory } from './itemCategory';

export class PersonContact {
    person_contact_id:number;
    contact: string;
    contact_type_id:ItemCategory;
    person_id:Person;

    constructor(person_contact_id?:number,contact?: string, contact_type_id?:ItemCategory,person_id?:Person){
        this.person_contact_id=person_contact_id,
        this.contact=contact,
        this.contact_type_id=contact_type_id,
        this.person_id=person_id
        
    }

}

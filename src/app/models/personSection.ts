import { Section } from './section';
import { Person } from './person';

export class PersonSection {

    person_section_id: number;
    person_id : Person;
    section_id: Section;
    

    constructor(person_section_id?: number, person_id?: Person,section_id?: Section){
        this.section_id = section_id,
        this.person_id = person_id,
        this.section_id = section_id
        
    }

}
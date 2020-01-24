import { ItemCategory } from './itemCategory';

export class Section {

    section_id: number;
    name: string;
    university_career_id: ItemCategory;
    

    constructor(section_id?: number, name?: string,university_career_id?: ItemCategory){
        this.section_id = section_id,
        this.name = name,
        this.university_career_id = university_career_id
        
    }

}
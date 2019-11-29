import { ItemCategory } from './itemCategory';

export class Section {

    section_id: number;
    name: string;
    universitycarrer: ItemCategory;
    

    constructor(section_id?: number, name?: string,universitycarrer?: ItemCategory){
        this.section_id = section_id,
        this.name = name,
        this.universitycarrer = universitycarrer
        
    }

}
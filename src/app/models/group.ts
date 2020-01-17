import { ItemCategory } from './itemCategory';

export class Group {

    group_id: number;
    name: string;
    university_career_id: ItemCategory;
    

    constructor(group_id?: number, name?: string,university_career_id?: ItemCategory){
        this.group_id = group_id,
        this.name = name,
        this.university_career_id = university_career_id

    }

}
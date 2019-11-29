import { Person } from './person';
import { ItemCategory } from './itemCategory';

export class PersonMedia {

    person_media_id: number;
    path: string;
    item_category_id: ItemCategory;
    person_id : Person;
    

    constructor(person_media_id?: number, path?: string, person_id?: Person, item_category_id?: ItemCategory){
        this.person_media_id = person_media_id,
        this.path = path,
        this.item_category_id = item_category_id,
        this.person_id = person_id
        
    }

}
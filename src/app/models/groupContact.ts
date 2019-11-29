import { ItemCategory } from './itemCategory';
import { Group } from './group';

export class GroupContact {

    group_contact_id: number;
    contact: string;
    contact_type_id: ItemCategory;
    group_id: Group;
    

    constructor(group_contact_id?: number, contact?: string, contact_type_id?: ItemCategory,  group_id?: Group){
        this.group_contact_id = group_contact_id,
        this.contact = contact,
        this.contact_type_id = contact_type_id,
        this.group_id = group_id
        
    }

}
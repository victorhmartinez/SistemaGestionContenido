export class Personcontacts {
    contact_info_id:number;
    contact: string;
    item_category_id:number;
    persons_id:number;
    constructor(contact_infoid?:number,contact?: string, item_category_id?:number,person_id?:number){
        this.contact_info_id=contact_infoid,
        this.contact=contact,
        this.item_category_id=item_category_id,
        this.persons_id=person_id
        
    }

}

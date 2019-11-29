export class Category {

    category_id: number;
    name: string;
    active: boolean;

    constructor(category_id?: number, name?: string, active?: boolean){
        this.category_id = category_id,
        this.name = name,
        this.active = active
    }
//category_id": 1,
//"name": "Titulación",
//"active": true
}

import { Category } from './category';

export class ItemCategory {

    item_category_id: number;
    name: string;
    active: boolean;
    category_id: Category;

    constructor(item_category_id?: number, name?: string, active?: boolean, category_id?: Category){
        this.item_category_id = item_category_id,
        this.name = name,
        this.active = active,
        this.category_id = category_id
    }
/*"item_category_id": 3,
"name": "Octubre 2019 - Febrero 2020",
"active": true,
"category_id": 3*/
}
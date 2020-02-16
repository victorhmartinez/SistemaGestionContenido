import { ItemCategory } from './itemCategory';

export class Menu {

    menu_item_id: number;
    name: string;
    url:string;
    order: number;
    item_category_id: ItemCategory;
    

    constructor(menu_id?: number, name?: string, url?:string,order?: number, item_category_id?: ItemCategory){
        this.menu_item_id = menu_id,
        this.name = name,
        this.order = order,
        this.url=url,
        this.item_category_id = item_category_id
        
    }

}
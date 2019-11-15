
import { ItemCategory } from './itemCategory';

export class InfoSite {
    info_site_id:number;
    description: string;
    type_info: ItemCategory;
    info_site_universitycareer: number;

    constructor(info_site_id?:number, description?: string, type_info?: ItemCategory, info_site_universitycareer?: number){
        this.info_site_id = info_site_id,
        this.description = description,
        this.type_info = type_info,
        this.info_site_universitycareer=info_site_universitycareer
    }

}
import { ItemCategory } from './itemCategory';

export class Content {
    content_id:number;
    title: string;
    description: string;
    content_type_id: ItemCategory;
    academic_period_id:ItemCategory;
    university_career_id  : ItemCategory;
    

    constructor(content_id?: number, title?: string, description?: string,
                content_type_id?: ItemCategory, academic_period_id?: ItemCategory,
                university_career_id?: ItemCategory){

      this.content_id=content_id,
      this.title=title,
      this.description=description,
      this.content_type_id= content_type_id,
      this.academic_period_id= academic_period_id,
      this.university_career_id= university_career_id
      ;
    }

}

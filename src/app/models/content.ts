import { ItemCategory } from './itemCategory';

export class Content {
    content_id:number;
    title: string;
    description: string;
    update_time: Date;
    create_time: Date;
    content_type_id: ItemCategory;
    academic_period_id:ItemCategory;
    university_carrer_id  : ItemCategory;
    

    constructor(content_id?: number, title?: string, description?: string,
                update_time?: Date, create_time?: Date, content_type_id?: ItemCategory, academic_period_id?: ItemCategory,
                university_carrer_id?: ItemCategory){

      this.content_id=content_id,
      this.title=title,
      this.description=description,
     
      this.update_time= update_time,
      this.create_time=create_time,
      this.content_type_id= content_type_id,
      this.academic_period_id= academic_period_id,
      this.university_carrer_id= university_carrer_id
      ;
    }

}

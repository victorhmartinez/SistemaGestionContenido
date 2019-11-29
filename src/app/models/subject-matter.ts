import { ItemCategory } from './itemCategory';
export class SubjectMatter {
    subject_matter_id : number;
    name :string;
    semester: number;
    university_carrer_id :ItemCategory;

    constructor(subject_matter_id ?: number, name ?: string, semester ?: number,university_carrer_id ?: ItemCategory){
    this.subject_matter_id= subject_matter_id
    this.name =name,
    this.semester =semester,
    this.university_carrer_id= university_carrer_id
    }
}

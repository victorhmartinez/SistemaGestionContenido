import { ItemCategory } from './itemCategory';
export class SubjectMatter {
    subject_matter_id : number;
    name :string;
    semester: number;
    university_career_id :ItemCategory;

    constructor(subject_matter_id ?: number, name ?: string, semester ?: number,university_career_id ?: ItemCategory){
    this.subject_matter_id= subject_matter_id
    this.name =name,
    this.semester =semester,
    this.university_career_id= university_career_id
    }
}

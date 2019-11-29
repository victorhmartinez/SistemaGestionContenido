import { ItemCategory } from './itemCategory';
export class SubjectMatter {
    subject_matter_id : number;
    name :string;
<<<<<<< HEAD
    university_career_id :number;
    semester:number;
    constructor(subject_matter_id ?: number,name ?: string,university_career_id ?: number,semester?:number){
this.name =name,
this.subject_matter_id= subject_matter_id,
this.university_career_id= university_career_id,
this.semester=semester;
=======
    semester: number;
    university_carrer_id :ItemCategory;

    constructor(subject_matter_id ?: number, name ?: string, semester ?: number,university_carrer_id ?: ItemCategory){
    this.subject_matter_id= subject_matter_id
    this.name =name,
    this.semester =semester,
    this.university_carrer_id= university_carrer_id
>>>>>>> fc4977f74ef765772b87a57069eb8771e574d005
    }
}

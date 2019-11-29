export class SubjectMatter {
    subject_matter_id : number;
    name :string;
    university_career_id :number;
    semester:number;
    constructor(subject_matter_id ?: number,name ?: string,university_career_id ?: number,semester?:number){
this.name =name,
this.subject_matter_id= subject_matter_id,
this.university_career_id= university_career_id,
this.semester=semester;
    }
}

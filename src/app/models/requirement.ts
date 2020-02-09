import { SubjectMatter } from './subject-matter';

export class Requirement {
    requirement_id: number;
    subject_matter_id : SubjectMatter;
    subject_matter_requirement_id :SubjectMatter;

    constructor(requirement_id ?:number, subject_matter_id?: SubjectMatter,subject_matter_requirement_id?:SubjectMatter  ){
        this.requirement_id= requirement_id;
        this.subject_matter_id = subject_matter_id;
        this.subject_matter_requirement_id = subject_matter_requirement_id
    }
 
}

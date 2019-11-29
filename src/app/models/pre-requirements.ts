export class PreRequirements {
    requirement_id: number
    subject_matter_id : number
    subject_matter_requeriment_id :number
    constructor(requirement_id ?:number,subject_matter_id?: number,subject_matter_requeriment_id?:number  ){
        this.requirement_id= requirement_id;
        this.subject_matter_id = subject_matter_id;
        this.subject_matter_requeriment_id= subject_matter_requeriment_id
    }
 
}

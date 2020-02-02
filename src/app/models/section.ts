import { UniversityCarrer } from './universityCareer';

export class Section {

    section_id: number;
    name: string;
    university_career_id: UniversityCarrer;
    

    constructor(section_id?: number, name?: string,university_career_id?: UniversityCarrer){
        this.section_id = section_id,
        this.name = name,
        this.university_career_id = university_career_id
        
    }

}
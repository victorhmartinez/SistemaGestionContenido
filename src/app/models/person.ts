export class Person {
    person_id :number;
    first_name:string;
    second_name:string;
    first_last_name:string;
    second_last_name:string;
    
constructor(person_id?:number,first_name?:string,second_name?:string,first_last_name?:string,second_last_name?:string){
    this.person_id=person_id,
    this.first_name=first_name,
    this.second_name=second_name,
    this.first_last_name=first_last_name,
    this.second_last_name=second_last_name
}
}
/*"person_id": 1,
        "first_name": "Luis",
        "second_name": "Rodrigo",
        "first_last_name": "Barba",
        "second_last_name": "Guamán"*/
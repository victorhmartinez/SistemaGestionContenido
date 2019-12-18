export class UserI {
    id: number;
    username: string;
    password: string;
    is_admin:boolean;
    is_superuser:boolean
    
 constructor(id?:number,username?:string,password ?: string,is_admin?:boolean,is_superuser?: boolean){
    id=this.id
    username=this.username
    password=this.password
    is_admin=this.is_admin
    is_superuser=this.is_superuser
 }
}

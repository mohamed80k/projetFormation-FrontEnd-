import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 

  }
  postusers(data : any){
    return this.http.post<any>("http://localhost:3000/employee",data);
  }

  getuser(){
  
    return this.http.get<any>("http://localhost:3000/employee");
  }
  putuser(data:any,id:number){
  
    return this.http.put<any>("http://localhost:3000/employee/"+id,data);

  }
  putpassworduser(data:any,id:number){
  
    return this.http.put<any>("http://localhost:3000/employee/updatepassword/"+id,data);

  }
  deleteuser(id:number){
    return this.http.delete<any>("http://localhost:3000/employee/"+id);
  }
  getuserone(id:number){
    
    return this.http.get<any>("http://localhost:3000/employee/"+id);
  }
  getuserbyfilter(mail:string){
    
    return this.http.get<any>("http://localhost:3000/"+mail);
  }
  getadmin(){
    return  this.http.get<any>("http://localhost:3000/admin/all")
  }

  getpartie(formatio:string){
    return this.http.get<any>("http://localhost:3000/formationpartie/"+formatio);
  }
  getlesson(partie:string){
    return this.http.get<any>("http://localhost:3000/formationlesson/"+partie);
  }

  getchapitre(chapi:string){
    return this.http.get<any>("http://localhost:3000/formationchapitre/"+chapi);
  }
  
  gethtml(chapitre:string){
    return this.http.get<any>("http://localhost:3000/formationhtml/"+chapitre);
  }
  getallformation(){
    return this.http.get<any>("http://localhost:3000/getallformation/all/formation");
  }
  sendMail(data : any){
    return this.http.post<any>("http://localhost:3000/sendmail/mail/all/send",data);
  }
}
                         
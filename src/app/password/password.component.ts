import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public loginForm!:FormGroup
  public pass =  localStorage.getItem("passwordd");
  public Id =JSON.parse(localStorage.getItem("getid")!);


  
  constructor(private api : ApiService , private formBuilder :FormBuilder) { 
    this.oncldddi();
    // console.log(this.Id)
    // console.log(this.loginForm.value)
  }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      currpassword:[''],
      newpassword:[''],
      verifypassword:[''],
      
    })
    this.oncldddi();
  //  this.updatepassword()
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{

      this.loginForm.value.password=res.data[0].PassWord;
      let a  = res.data[0].id;
      
      localStorage.setItem("passwordd",   this.loginForm.value.password);
      localStorage.setItem("getid",JSON.stringify(a));
      
    
         
},
error:()=>{
    alert("error while updating");
    
}

   })
   

}
updatepassword(){
  if(this.loginForm.value.newpassword){
    if(this.loginForm.value.newpassword==this.loginForm.value.verifypassword){
      this.api.putpassworduser({PassWord : this.loginForm.value.newpassword },this.Id).subscribe({
        next:(res)=>{
          alert("updating succesfully");
           
    },
    error:()=>{
      alert("error while updating");
      
    }
    
     })
     
    
    }
    else{
      alert("You have to enter the same password")
    }
    }
    else{
      alert("data is empty")
    }
  }
 
  

}
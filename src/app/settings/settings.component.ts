import { WriteKeyExpr } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public loginForm!:FormGroup
  public last =  localStorage.getItem("firstname");
  public firs = localStorage.getItem("lastname");
  public emai = localStorage.getItem("email");

  
  constructor(private api : ApiService , private formBuilder :FormBuilder) { 
    this.oncldddi();
  }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      firstname:[this.firs],
      lastname:[this.last],
      email:[this.emai]
    })
    this.oncldddi();
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{
 
        
        
       this.loginForm.value.firstname=res.data[0].firstname;
       localStorage.setItem("firstname",  this.loginForm.value.firstname);
       this.loginForm.value.lastname=res.data[0].lastname;
       localStorage.setItem("lastname",   this.loginForm.value.lastname);
      this.loginForm.value.email=res.data[0].mail;
      localStorage.setItem("email",   this.loginForm.value.email);
        console.log(this.loginForm.value);
        
         
},
error:()=>{
    alert("error while updating");
    
}

   })
   

}
} 


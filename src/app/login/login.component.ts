import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup
  constructor(private formBuilder :FormBuilder , private api : ApiService ,private http : HttpClient , private router : Router,private autenticate : AuthService) { 
    localStorage.clear();
  }

  ngOnInit(): void {
    
    this.loginForm= this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  login2(){
    this.api.getuser()
    .subscribe(res=>{
      const user = res.data.find((a:any)=>{
          return a.mail === this.loginForm.value.email && a.PassWord === this.loginForm.value.password
         });
         if(user){
          this.autenticate.login();
          localStorage.setItem("gmail", this.loginForm.value.email);
          localStorage.setItem("formation", user.formations);
          
  
                alert("Login Success!!");
                
                this.loginForm.reset();
                this.router.navigate(["acceuil"]);
               }else {
                this.autenticate.logout();
                alert("user not found");
               }
     
            
              }
              );
              
    
            }

  
  login(){
    this.api.getadmin()
    .subscribe(res=>{
      const user = res.data.find((a:any)=>{
          return a.mail === this.loginForm.value.email && a.password === this.loginForm.value.password
         });
         if(user){
                this.autenticate.login();
                alert("Login Success!!");
                
                this.loginForm.reset();
                this.router.navigate(["dashbord"]);
               }else {
                
                this.login2();
               }
     
            
              }
              );
              
    
            }
          }
      
            

          
        
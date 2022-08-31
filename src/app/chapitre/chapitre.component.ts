import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  public chapitres: any[] = [];
 

  //  public partss = environment.partsss
  //  public partss = JSON.parse(localStorage.getItem("nam")!);
    // public less1 = localStorage.getItem("lesson1");
    // public less2 = localStorage.getItem("lesson2");
    // public res1 = localStorage.getItem("res1");
    // public res2 = localStorage.getItem("res2");
    // public res3 = localStorage.getItem("res3");
    // public res4 = localStorage.getItem("res4");
     public form5 = localStorage.getItem("formation");
    lesson: string = ''
    constructor(private api : ApiService, private route: ActivatedRoute, private router : Router) {
      route.params.subscribe(params => {
        this.chapitres = [];
        this.lesson = params['chapiname']
        this.onclick3()
  
        // console.log(this.lesson)
       //this.onclick1()
      })
   
      
  
    }
   
  
    ngOnInit(): void {
  
    // this.onclick1()
  
    }
  
  
  
    //  parctable(){
    //   for (let i = 1; i < (parseInt(localStorage.getItem("long")!)+1); i++) {
    
    //     this.lessons.push(localStorage.getItem("lesson"+i)!)
    //  }
    // }
  
  
  
  
  
    onclick3() : any
    {
     
     
      this.api.getchapitre(this.lesson).subscribe((res)=>{
     
          console.log("Inside get")
          for (let i = 1; i < res.data.length+1; i++) {
  
            this.chapitres.push(res.data[i-1].chapitre)
  
  
            
          }
          
  error:()=>{
      alert("error while updating");
      
  }
  
     })
     
  
  }

  
  }
  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  public cours: any;

  public form5 = localStorage.getItem("formation");
  cour: string = ''
  constructor(private api : ApiService, private route: ActivatedRoute, private router : Router,private sanitizer: DomSanitizer) {
    route.params.subscribe(params => {
      //  this.cours = this.cours.innerHtml
    
      this.cour = params['courname']
      this.onclick2()
     
      


     
    
    })
    

  }

  ngOnInit(): void {
    this.onclick2()
  }
  onclick2() : any
  {
   
   
    this.api.gethtml(this.cour).subscribe((res)=>{
   
        console.log("Inside get")
        for (let i = 1; i < res.data.length+1; i++) {

          this.cours = res.data[i-1].HTML


          
        }
        this.cours = this.sanitizer.bypassSecurityTrustHtml(this.cours);

        
error:()=>{
    alert("error while updating");
    
}

   })
   

}

}

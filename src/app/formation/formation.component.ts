
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})

export class FormationComponent implements OnInit {
  
    

    
public  parts: any[] =[];
     

  

   public form5 = localStorage.getItem("formation");

   public longr = localStorage.getItem("longueur");

  

  constructor(private api : ApiService ) { 
  
  }

  ngOnInit(): void {
    this.onclick1();
console.log(this.parts)
    
   
  }




   
  
  onclick1() : any
  {
    
    this.api.getpartie(localStorage.getItem("formation")!).subscribe({
      next:(res)=>{
        for (let i = 1; i < res.data.length+1; i++) {
         this.parts.push(res.data[i-1].partie)
        
       // localStorage.setItem("part"+i,res.data[i-1].partie);
      //  localStorage.setItem("longueur",res.data.length);
     
       
        }  
        // localStorage.setItem("nam",JSON.stringify(this.parts));
       
},
error:()=>{
    alert("error while updating");
    
}

   })
   

}

}

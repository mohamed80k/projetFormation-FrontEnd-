import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  public format =  localStorage.getItem("formation");
  public  test = ['a','b','s'];


  
  constructor(private api : ApiService ) { 
    this.oncldddi();
  }

  ngOnInit(): void {
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{
 
        
      
       localStorage.setItem("formation", res.data[0].formations);

         
},
error:()=>{
    alert("error while updating");
    
}

   })
   

}
} 

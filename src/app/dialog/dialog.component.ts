import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {FormControl} from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

   email = new FormControl('', [Validators.required, Validators.email]);
   // pswd : any = Math.floor(Math.random() * 7000000)
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


   

   productForm!:FormGroup;
   actionBtn : string ='save';
   constructor(private formBuilder:FormBuilder ,
    private api : ApiService , 
   @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){}


   ngOnInit():void{
    this.productForm=this.formBuilder.group({
       firstname:['',Validators.required],
       lastname:['',Validators.required],
       cin: ['',Validators.required],
       formations: ['',Validators.required],
       mail: ['',Validators.required],
       PassWord:[this.generateP(),Validators.required],
       metier: ['',Validators.required],
       date: ['',Validators.required],
    

       
       
   })
   if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['firstname'].setValue(this.editData.firstname);
      this.productForm.controls['lastname'].setValue(this.editData.lastname);
      this.productForm.controls['cin'].setValue(this.editData.cin);
      this.productForm.controls['formations'].setValue(this.editData.formations);
      this.productForm.controls['mail'].setValue(this.editData.mail);
      this.productForm.controls['PassWord'].setValue(this.editData.PassWord);
      this.productForm.controls['metier'].setValue(this.editData.metier);
      this.productForm.controls['date'].setValue(this.editData.date);
      

}}
adduser() {
if(!this.editData){
   if(this.productForm.valid){
      this.api.postusers(this.productForm.value)
     
      .subscribe({
         next:(res)=>{
            
            alert("succcessfully");
            this.productForm.reset();
            this.dialogRef.close('save');
            
         },
         error:()=>{
            alert("error")
         }
      })
      this.api.sendMail(this.productForm.value)   
      .subscribe({
         next:(res)=>{
            
            alert("email sended");
         
            
         },
         error:()=>{
            alert("error")
         }
      })
         
    
    }
}else{
   this.updateuser()
}
}
updateuser(){
   this.api.putuser(this.productForm.value,this.editData.id)
  
   .subscribe({
      next:(res)=>{
         alert("succcessfully");
       
         this.productForm.reset();
            this.dialogRef.close('update');
           
},
error:()=>{
   alert("error while updating")
}

   })
}
generateP(){
   var pass = '';
   var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
           'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
   for (let i = 1; i <= 8; i++) {
       var char = Math.floor(Math.random()
                   * str.length + 1);
 
       pass += str.charAt(char)
   }
 
   return pass;
 }

}

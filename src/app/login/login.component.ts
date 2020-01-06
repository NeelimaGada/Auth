import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  val:boolean;
  constructor(private fb:FormBuilder,private ht:HttpClient,private r:Router,private auth:AuthService) { }
  login=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z]*')]],
    email:[],
   password:[]

  },
  );
  
  
sub(e)
{
  e.preventdefault;

this.ht.get("http://localhost:3000/Details?username="+e.username+"&&email="+e.email+"&&password="+e.password  ).subscribe(resp=>{console.log(resp)
if(resp==0){
  this.val=true;
 
}
else{
alert("Successfully Logged");
  this.val=false;

  }
  if (this.login.valid) {
    this.auth.sendToken(this.login.value.email)
    this.r.navigate(["home"]);
  }
})

}
  ngOnInit() {
   
  }

}
// form;
// constructor(private fb: FormBuilder,
//   private myRoute: Router,
//   private auth: AuthService) {
//   this.form = fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });
// }
// ngOnInit() {
// }
// login() {
//   if (this.form.valid) {
//     this.auth.sendToken(this.form.value.email)
//     this.myRoute.navigate(["home"]);
//   }
// }
// }
import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Register: FormGroup;
  submitted = false;
  registerForm: any;
  result;
  val: boolean;

  constructor(private fb: FormBuilder, private ht: HttpClient, private s: DataService, private r: Router) { }

  get f() { return this.registerForm.controls; }


  ngOnInit() {
      this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      mobileno: ['', Validators.required],
      password:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9@#$!]*')]],
    conpassword:['',Validators.required]
      
    }
    ,
  {validator:this.pwdchk});
  }
  pwdchk(g:FormGroup)
{
if(g.controls.password.value===g.controls.conpassword.value)
{
  return null;
}
else
return {
  'mismatch':true
}
}
  onSubmit() {
    this.submitted = true;
    

    if (this.registerForm.invalid) {
      return;
    }
     this.s.details(this.registerForm.value).subscribe(resp => console.log(resp))
  
    alert("Successfully Registered")
    this.s.Get_Data().subscribe(resp => {
      console.log(resp)
      this.result = resp
    })

  }


}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  constructor(private accountService: AccountService,private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('',Validators.required),
    })
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl)
    }, error => console.log(error));

  }

   DisplayFieldCss(field: string){
    if(this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched){
      return 'is-invalid'
    }else if (this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }

}

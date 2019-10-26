import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {BsModalRef, BsModalService, TabsetComponent} from 'ngx-bootstrap';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Router } from '@angular/router';
import { UserRegisterType } from 'src/app/shared/models/userRegistertype';
import {AlertComponent} from 'ngx-bootstrap';

@Component({
  selector: 'app-loginandregister',
  templateUrl: './loginandregister.component.html',
  styleUrls: ['./loginandregister.component.css']
})
export class LoginandregisterComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  loginForm:FormGroup;
  registerForm:FormGroup;
  //Properties
  public loginData;
  public alertType;
  public registerStatus;
  public userData:UserRegisterType;
  public errorMessage:string;
  public LoginError;
  public registerMessage;
  constructor(public bsModalRef: BsModalRef,public modalService:BsModalService,
              private fb:FormBuilder , private userService: ShoppingService,
              private router : Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email':['',[Validators.required]],
      'password':['',[Validators.required]]
    });
    this.registerForm = this.fb.group({
      'firstname':['',Validators.required],
      'lastname':['',Validators.required],
      'email': ['',[Validators.required,Validators.email]],
        'password': ['',[Validators.required]]
    })
  }

  //Register

  Save(Data){
    this.userData = Data;
    // console.log(this.userData);
    this.userService.RegisterUser(this.userData).subscribe((data)=>{
      
      console.log(data);
     this.bsModalRef.hide();
     
     this.registerMessage = `Registered Successfully please Login to Continue`;
     this.staticTabs.tabs[0].active = true;
    
    },
    (err)=>{
      console.log(err)
      this.errorMessage = err.error.message;
      this.staticTabs.tabs[1].active = true;
    }
    )
  }
  
  //Login Check
  Check(data){
    
    this.loginData=data;
    // console.log(this.loginData);
    this.userService.LoginUser(this.loginData).subscribe((data)=>{
        console.log(data);
        localStorage.setItem('id',data);
      this.bsModalRef.hide();
       location.reload();
    },
    (err)=>{
      console.log(err);
      this.LoginError = err.error.message;
    }
    )
    
  }
  openModal(template: TemplateRef<any>) {
      this.bsModalRef = this.modalService.show(template);
    }
   

}

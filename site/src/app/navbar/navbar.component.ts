import { Component, OnInit,Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginandregisterComponent } from '../loginandregister/loginandregister.component';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  bsModalRef: BsModalRef;
  isLogin;
  useremail = '';
  public id = localStorage.getItem('id');
  @Input() cartlength;
  constructor(private modalService: BsModalService, private userService:ShoppingService) {}
 
  ngOnInit(){
    this.isLogin = localStorage.getItem('token');
    this.userService.GetUser(this.id).subscribe((data)=>{
      this.useremail = data;
      console.log(this.useremail);
    }) 
  }
  openModalWithComponent() {
    
    this.bsModalRef = this.modalService.show(LoginandregisterComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.closeBtnName = 'Login'
  }
  

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BsModalService ,BsModalRef} from 'ngx-bootstrap';
import {LoginandregisterComponent} from './loginandregister/loginandregister.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  bsModalRef: BsModalRef;
  constructor(private modalService:BsModalService){}
  canActivate():  boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      this.bsModalRef = this.modalService.show(LoginandregisterComponent);
      return false;
    }
    
  }
}

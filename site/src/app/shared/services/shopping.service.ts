import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { UserRegisterType } from '../models/userRegistertype';
import { catchError,map } from "rxjs/operators";
import {throwError } from 'rxjs';
import { Router } from '@angular/router';
import {ProductType} from '../models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  registerUrl='http://localhost:3000/api/onlineshopping/register';
  loginUrl='http://localhost:3000/api/onlineshopping/auth';
  getUser='http://localhost:3000/api/onlineshopping/getuser/';

  //mens fashion
  tshirtsUrl='http://localhost:3000/api/onlineshopping/getMensTshirts';
  jeansUrl='http://localhost:3000/api/onlineshopping/getMensJeans';

  //cart
  deleteCart ='http://localhost:3000/api/onlineshopping/deleteCartItem';
  addCart ='http://localhost:3000/api/onlineshopping/storeCartItem';
  getCartUrl ='http://localhost:3000/api/onlineshopping/getCartItem'

  headers:HttpHeaders;
  userId:string;
  constructor(private http:HttpClient , private router:Router){
      this.headers = new HttpHeaders({
          'Content-Type':'application/json'
      })
  }
  
  RegisterUser(userData){
     return this.http.post<UserRegisterType>(this.registerUrl,userData,{
          headers:this.headers
      }).pipe(catchError(this.handleError));
  }
  
  LoginUser(loginData){
     return this.http.post<UserRegisterType>(this.loginUrl,JSON.stringify(loginData),{
          headers:this.headers
      }).pipe(map((item) => {
                 if(item && item.token){
                  localStorage.setItem('token',JSON.stringify(item.token));
                  this.userId = item.userId;
                  console.log(this.userId);
                  return this.userId;
                 }
      } ),
      catchError(this.handleError));
  }
  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    location.reload();
    this.router.navigate(['home']);
    
  }
  GetUser(id){
    return this.http.get<UserRegisterType>(this.getUser+id).pipe(map((data)=>{
      if(data){
        return data.email;
      }
    }));
  }
  handleError(error:HttpErrorResponse){
        return throwError(error);
      }
  
      GetMensTshirts(){
        return this.http.get<ProductType>(this.tshirtsUrl);
      }
      GetMensTshirtsById(id){
        return this.http.get<ProductType>(this.tshirtsUrl+'/'+id);
      }

      GetMensJeans(){
        return this.http.get<ProductType>(this.jeansUrl);
      }
      GetMensJeansById(id){
        return this.http.get<ProductType>(this.jeansUrl+'/'+id);
      }
      //Cart Related
  AddItemToCart(item){
    return this.http.post<ProductType>(this.addCart,item,{
        headers:this.headers
    });
  }
  GetCartById(id){
    return this.http.get(this.getCartUrl+'/'+id);
    
  }

  DeleteCart(id){
    return this.http.delete(this.deleteCart+'/'+id);
  }
}

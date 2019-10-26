import { Component, OnInit } from '@angular/core';
import {ShoppingService} from '../../shared/services/shopping.service';
import { ProductType } from 'src/app/shared/models/productType';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData;
  cartLength;
  cartMessage='';
  private userId = localStorage.getItem('id');
  constructor(private cartService:ShoppingService) { }
 
  ngOnInit() {
      
    this.cartService.GetCartById(this.userId).subscribe((data)=>{
        this.cartData = data; 
        console.log(this.cartData);
        this.cartLength = this.cartData.length;
        console.log(this.cartLength);
        if(this.cartLength==0){
          this.cartMessage = 'Cart is Empty';
        }
     })
    
     
  }
  deleteCart(id){
   this.cartService.DeleteCart(id).subscribe((data)=>{
     console.log(data)
     location.reload();
   },(err)=>{
     console.log(err);
   })
  }
  
  
}

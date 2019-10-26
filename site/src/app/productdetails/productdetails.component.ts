import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shared/services/shopping.service';
import { ProductType } from '../shared/models/productType';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LoginandregisterComponent } from '../loginandregister/loginandregister.component';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  storeProducts: ProductType;
  arrayForCart;
  productId: number;
  cartError;
  bsModalRef: BsModalRef;
  isLogin = localStorage.getItem('token');
  constructor(private productService: ShoppingService, private route: ActivatedRoute,private router:Router,private modalService:BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      console.log(this.productId);
    })
    //Mens fashion
    this.productService.GetMensTshirtsById(this.productId).subscribe((data) => {
      this.storeProducts = data;
      console.log(data);
    }, (err) => {  });

    this.productService.GetMensJeansById(this.productId).subscribe((data) => {
      this.storeProducts = data;
      console.log(data);
    }, (err) => {  });
  }

  addToCart() {
    if(this.isLogin){
      const userId = localStorage.getItem('id');
    this.storeProducts.userId = userId
    console.log(userId);
    const arrayForCart = this.storeProducts;
    delete arrayForCart._id; delete arrayForCart.__v;
    console.log(arrayForCart);
    console.log('store items');
    this.productService.AddItemToCart(arrayForCart).subscribe((data) => {
      console.log(data);
      // location.reload();
      window.alert('Product Added Successfully')
    this.router.navigate(['/cart']);
    },(err)=>{
      window.alert('Product Already Exist in cart');
      
    });
    }
    else{
      this.bsModalRef = this.modalService.show(LoginandregisterComponent);
    }
    
  }

}

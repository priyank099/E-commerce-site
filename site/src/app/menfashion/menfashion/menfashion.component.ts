import { Component, OnInit } from '@angular/core';
import {ShoppingService} from '../../shared/services/shopping.service';
import { ProductType } from 'src/app/shared/models/productType';
@Component({
  selector: 'app-menfashion',
  templateUrl: './menfashion.component.html',
  styleUrls: ['./menfashion.component.css']
})
export class MenfashionComponent implements OnInit {

  storeTshirts:ProductType;
  storeJeans:ProductType;
  constructor(private menService: ShoppingService) { }

  ngOnInit() {
    //Tshirt
    this.menService.GetMensTshirts().subscribe((data)=>{
      console.log(data);
      this.storeTshirts = data;
    });
    //Shoes
    this.menService.GetMensJeans().subscribe((data)=>{
      console.log(data);
      this.storeJeans = data;
    });
    
  }

}

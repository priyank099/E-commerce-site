import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenfashionComponent } from './menfashion/menfashion.component';
import {RouterModule} from '@angular/router';
import {menRoutes} from './men.routes';
import { TabsModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [MenfashionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(menRoutes),
    TabsModule
  ]
})
export class MenfashionModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginandregisterComponent} from './loginandregister/loginandregister.component';
import { AuthGuard } from './auth.guard';
import { AboutusComponent } from './aboutus/aboutus.component';
import {ProductdetailsComponent} from './productdetails/productdetails.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
},
{
  path:'home',
  component:HomeComponent,
},
{
  path:'mens/:id',
  component:ProductdetailsComponent
},
{
  path:'mens',
  loadChildren:'./menfashion/menfashion.module#MenfashionModule'
},
{
  path:'aboutus',
  component:AboutusComponent,
},
{
  path:'cart',
  loadChildren:'./cart/cart.module#CartModule',
  canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

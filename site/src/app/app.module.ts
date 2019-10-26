import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ModalModule, TabsModule, AlertModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { ShoppingService } from './shared/services/shopping.service';
import { AuthGuard } from './auth.guard';
import { LoginandregisterComponent } from './loginandregister/loginandregister.component';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginandregisterComponent,
    AboutusComponent,
    ProductdetailsComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [ShoppingService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginandregisterComponent]
})
export class AppModule { }

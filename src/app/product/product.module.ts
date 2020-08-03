import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductCartComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HttpClientModule,ProductsComponent, ProductListComponent, ProductCartComponent]
})
export class ProductModule { }

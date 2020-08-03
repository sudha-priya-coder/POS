import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  /** path of product json */
  configUrl = 'assets/pos/products.json';
  /** Array of products */
  public productList: any;
  /** Dependency injection */
  constructor(private http: HttpClient, private productService: ProductService) { }

  /** To get products list */
  ngOnInit() {
    this.getConfig();
  }
  /** To get List of products from json */
  private getConfig() {
    return this.http.get(this.configUrl).subscribe(data => {
      this.productList = data;
    });
  }
  /** Method call after selecting item */
  public selectItem(item) {
    this.productService.updateCartItems(item);
  }
}

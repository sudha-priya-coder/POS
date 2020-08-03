import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  public cartHeaderLabel = ['PRODUCT', 'PRICE','QUANTITY','TOTAL'];
  public cartItems = []
  public calculatedTax;
  public numberOfTotalItems;
  public totalPriceWithTaxes;
  public priceOfIems;
  public displayCart  = false;
  public displayModel = false;
  public getDateAndTime = '';
  public priceCalculations = [
    {
      'label1': 'Sub Total',
      'label2': '0.000 EUR',
      'label3': '0 items'
    },
    {
      'label1': 'VAT tax',
      'label2': 'N/A',
      'label3': 'EUR'
    },
    {
      'label1': 'Discount',
      'label2': 'N/A',
      'label3': 'EUR'
    },
    {
      'label1': 'Total',
      'label2': '0.000 EUR',
      'label3': ''
    }]
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getUpdatedItemsInCart();
  }
  public getUpdatedItemsInCart() {
    this.productService.$itemInCart.subscribe(data => {
    this.setData(data);
    });
  }
  public setData(data) {
   this.cartItems = data['detail'];
   if(this.cartItems && this.cartItems.length > 0) {
     this.displayCart = true;
     this.calculatedTax = data['calculatedTax'];
     this.numberOfTotalItems = data['numberOfTotalItems'];
     this.priceOfIems = data['priceOfIems'];
     this.totalPriceWithTaxes = data['totalPriceWithTaxes'];
   } else {
     this.resetData();
   }
  }
 
  getPriceOfItemsWithQuantity() {
    return 
  }
  public addQuantity(cart) {
    this.productService.updateQuantity(cart,'add');
  }
  public deleteQuantity(cart, index) {
    if(cart['quantity'] > 1) {
    this.productService.updateQuantity(cart,'minus');
    } else {
      this.cartItems.splice(index,1);
      this.productService.setFinalCartData(this.cartItems);
    }
  }
  public deleteItem(index) {
    this.cartItems.splice(index,1);
    this.productService.setFinalCartData(this.cartItems);
  }
  public cancelSale() {
    this.resetData();
  }
  public resetData() {
    this.displayCart = false;
    this.cartItems = [];
    this.productService.itemsInCart = [];
    this.calculatedTax = Number('');
    this.numberOfTotalItems = Number('');
    this.totalPriceWithTaxes = Number('');
    this.priceOfIems = Number('');
  }
  public processSale() {
    let date = new Date();
     let ISOString  = date.toISOString();
     this.getDateAndTime = ISOString.replace('T',' ').substring(0,ISOString.length - 5);
    this.displayModel = true;
  }
  public close() {
    this.resetData();
    this.displayModel = false;
  }
}

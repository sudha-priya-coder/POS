import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /** Instance of Behaviour Subject  */
  public $itemInCart: BehaviorSubject<{}> = new BehaviorSubject({});
  /** itemsInCart -> Items added to cart */
  public itemsInCart = [];
  constructor() { }
  /** Items Updated in Cart 
   * First check -> Same Item is present or not
   * If yes then Add in quantity
   * If No then Add as a new Item
   */
  public updateCartItems(item) {
    if (this.checkItemInCartIsEmpty()) {
      this.updateItemInCart(item);
    } else {
      this.keepItemInCartFirstTime(item);
    }
  }
  /** To check cart is empty or not */
  private checkItemInCartIsEmpty() {
    if (this.itemsInCart && this.itemsInCart.length > 0) {
      return true
    } else {
      return false;
    }
  }

  /** Add Item in cart for first time */
  public keepItemInCartFirstTime(selectedItem) {
    let item = {}
    let selecteItemArray = [];
    selectedItem['quantity'] = 1;
    selectedItem['total'] = 1 * Number(selectedItem['price']);
    this.itemsInCart.push(selectedItem);
    selecteItemArray.push(selectedItem);
    item['priceOfIems'] = 1 * Number(selectedItem['price']);
    item['calculatedTax'] = .1 * Number(selectedItem['price']);
    item['calulatedDiscount'] = .1 * Number(selectedItem['price']);
    item['numberOfTotalItems'] = 1;
    item['totalPriceWithTaxes'] = Number(selectedItem['price']) + item['calculatedTax'] - item['calulatedDiscount'];
    item['detail'] = selecteItemArray;
    this.$itemInCart.next(item);
  }

  /** To get total price
   * @param {All Items added in Cart} items
   */
  getTotalPrice(items) {
    let total = 0;
    items.forEach(item => {
      total = total + (Number(item['price']) * Number(item['quantity']));
    });
    return total;
  }
  /** To get total number of items added
   * @param{items} Items added in cart
   */
  getNumberOfTotalItems(items) {
    let total = 0;
    items.forEach(item => {
      total = total + Number(item['quantity']);
    });
    return total;
  }
  /** Update cart after adding Item in cart
   * @param{cart} Cart to be added 
   */
  public updateItemInCart(cart) {
    let addNewItem = true;
    this.itemsInCart.forEach(item => {
      if (item['id'] === cart['id']) {
        this.updateQuantity(cart, 'add');
        addNewItem = false;
        return;
      } else {
      }
    });
    if (addNewItem) {
      this.addNewItem(cart);
    }
  }

  /**
   * To set quantity and total in object in Updation
   * @param item 
   */
  public addNewItem(item) {
    item['quantity'] = 1;
    item['total'] = Number(item['price']);
    this.itemsInCart.push(item);
    this.setFinalCartData(this.itemsInCart);
  }
 
  /** To update quantity
   * First check Id is same or not
   */
  public updateQuantity(item, type) {
    this.itemsInCart.forEach(itemInCart => {
      if (itemInCart['id'] === item['id']) {
        if (type === 'add') {
          itemInCart['quantity'] = Number(itemInCart['quantity']) + 1;
          itemInCart['total'] = Number(itemInCart['price']) * Number(itemInCart['quantity']);
          this.setFinalCartData(this.itemsInCart);
        } else {
          itemInCart['quantity'] = Number(itemInCart['quantity']) - 1;
          itemInCart['total'] = Number(itemInCart['price']) * Number(itemInCart['quantity']);
          this.setFinalCartData(this.itemsInCart);
        }
      }
    })
  }

  /** To get final json in updation */
  public setFinalCartData(itemsInCartInArray) {
    let item = {}
    item['priceOfIems'] = this.getTotalPrice(itemsInCartInArray);
    item['calculatedTax'] = .1 * item['priceOfIems'];
    item['calculatedDiscount'] = .1 * item['priceOfIems'];
    item['totalPriceWithTaxes'] = item['priceOfIems'] + item['calculatedTax'] - item['calculatedDiscount'];
    item['numberOfTotalItems'] = this.getNumberOfTotalItems(itemsInCartInArray);
    item['detail'] = itemsInCartInArray;
    this.$itemInCart.next(item);
  }
}

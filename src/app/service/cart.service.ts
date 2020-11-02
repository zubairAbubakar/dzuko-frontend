import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){

    //check if item is already in the cart
    let alreadyExitsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    //check if cart is not empty
    if(this.cartItems.length > 0){
      
      //find item in the cart based on item id
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === cartItem.id);

      //check if item is found
      alreadyExitsInCart = (existingCartItem != undefined);
    }

    if(alreadyExitsInCart){

      //increment the quantity
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    //compute cart total price and total quatity
    this.computeCartTotals();

  }


  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems){
      
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values ...all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of cart');
    for (let cartItem of this.cartItems){

      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`name= ${cartItem.name}, quantity= ${cartItem.quantity}, unitPrice= ${cartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----')
  }


  /**
   * 
   * @param cartItem 
   */
  decrementCartItemQuantity(cartItem: CartItem){

   cartItem.quantity--;
  
   if(cartItem.quantity === 0){
     
    this.remove(cartItem);
   }
   else{
     this.computeCartTotals()
   }

  }


  remove(cartItem: CartItem) {
    
    //get index of the item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    //if found, remove the item from the array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}

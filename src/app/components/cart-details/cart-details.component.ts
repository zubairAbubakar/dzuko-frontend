import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.listCartDetails();  
  }


  listCartDetails() {

    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subcribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

   //subcribe to the cart totalQuantity
   this.cartService.totalQuantity.subscribe(
    data => this.totalQuantity = data
  );

  //compute cart total price and quantity
  this.cartService.computeCartTotals()

    
  }

  /**
   * 
   * @param cartItem 
   */
  incrementCartItemQuantity(cartItem: CartItem){
    
    this.cartService.addToCart(cartItem)
  }

  /**
   * 
   * @param cartItem 
   */
  decrementCartItemQuantity(cartItem: CartItem){

    this.cartService.decrementCartItemQuantity(cartItem);

  }


  /**
   * Remove item from the cart
   * @param cartItem 
   */
  removeCartItem(cartItem: CartItem){

    this.cartService.remove(cartItem);
  }

}

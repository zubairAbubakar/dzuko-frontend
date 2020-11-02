import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/common/ad';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  ad: Ad = new Ad();

  constructor(private adService: AdService,
              private cartService: CartService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.handleAdDetails();
    });

  }


  handleAdDetails() {
    
    //get the id parameter
    const adId: number = +this.route.snapshot.paramMap.get('id');

    this.adService.getAd(adId).subscribe(
      data => {
        this.ad = data;
      }
    )
  }

    /**
   * 
   * @param ad The ad to be added to cart
   */
  addToCart(){
    
    console.log(`Adding to cart: ${this.ad.name}, ${this.ad.unitPrice}`);

    const cartItem = new CartItem(this.ad);
    
    this.cartService.addToCart(cartItem);
  }

}

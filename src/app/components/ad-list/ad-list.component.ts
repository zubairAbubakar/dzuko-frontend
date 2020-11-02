import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/common/ad';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  ads: Ad[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean = false;

  //pagination properties
  pageNumber: number = 1
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private adService: AdService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listAds();
    });
  }

  listAds(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      
      this.handleSearchAds();
    }
    else{
      this.handleListAds();
    }
 
  }

  handleSearchAds(){

    const theKeyword = this.route.snapshot.paramMap.get('keyword');


    //if there is a different keyword than previous 
    //then set pageNumber to 1
    if(this.previousKeyword != theKeyword){
      
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`Keyword=${theKeyword}, PagaNumber=${this.pageNumber}`);

    //get the ads for the entered keyword
    this.adService.searchPaginatedAdList(this.pageNumber - 1,
                                         this.pageSize,
                                         theKeyword).subscribe(this.processResult());
  }

  handleListAds(){
    // Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get the id
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else{
      //default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //check if there is a different category than the previous
    //Angular will reuse a component if it is currently being viewed
    //
    
    //if there is a different categoryId than previous 
    //then set pageNumber to 1
    if(this.previousCategoryId != this.currentCategoryId){
      
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, PagaNumber=${this.pageNumber}`);

    //get the ads for the given category id
    this.adService.getPaginatedAdList(this.pageNumber - 1,
                                      this.pageSize,
                                      this.currentCategoryId).subscribe(this.processResult());

  }


  processResult() {
    
    return data => {
      this.ads = data._embedded.ads;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };

  }


  updatePageSize(pageSize: number){
    
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listAds();
  }

  /**
   * 
   * @param ad The ad to be added to cart
   */
  addToCart(ad: Ad){
    
    console.log(`Adding to cart: ${ad.name}, ${ad.unitPrice}`);

    const cartItem = new CartItem(ad);
    
    this.cartService.addToCart(cartItem);
  }

}

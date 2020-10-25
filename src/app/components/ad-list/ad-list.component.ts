import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/common/ad';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  ads: Ad[];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private adService: AdService,
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

    //get the ads for the entered keyword
    this.adService.SearchAds(theKeyword).subscribe(
      data => { 
        this.ads = data; 
      }
    )
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

    //get the ads for the given category id
    this.adService.getAdList(this.currentCategoryId).subscribe(
      data => { 
        this.ads = data; 
      }
    )
  }
}

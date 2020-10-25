import { Component, OnInit } from '@angular/core';
import { AdCategory } from 'src/app/common/ad-category';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-category-menu',
  templateUrl: './ad-category-menu.component.html',
  styleUrls: ['./ad-category-menu.component.css']
})
export class AdCategoryMenuComponent implements OnInit {

  adCategories: AdCategory[];

  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.listAdCategories();
  }


  listAdCategories() {
    
    this.adService.getAdCategories().subscribe(
      data => {
        console.log('Product Categories = '+JSON.stringify(data));
        this.adCategories = data;
      }
    );
  }

}

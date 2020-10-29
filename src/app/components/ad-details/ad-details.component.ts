import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/common/ad';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  ad: Ad = new Ad();

  constructor(private adService: AdService, 
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

}

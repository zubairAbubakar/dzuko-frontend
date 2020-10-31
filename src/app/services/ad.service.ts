import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from '../common/ad';
import { map } from 'rxjs/operators';
import { AdCategory } from '../common/ad-category';

@Injectable({
  providedIn: 'root'
})
export class AdService {


  private baseUrl = 'http://localhost:8082/api/ads';
  private categoryUrl = 'http://localhost:8082/api/ad-category';

  constructor(private httpClient: HttpClient) { }


  /**
   * This function gets ads by categoryId
   * @param categoryId 
   */
  getAdList(categoryId: number): Observable<Ad[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getAds(searchUrl);
  }



  getPaginatedAdList(page: number,
                    pageSize: number,
                    categoryId: number): Observable<GetAdResponse>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                    + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetAdResponse>(searchUrl);
  }


  /**
   * 
   * @param page 
   * @param pageSize 
   * @param keyword 
   */
  searchPaginatedAdList(page: number,
                        pageSize: number,
                        keyword: string): Observable<GetAdResponse>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
                    + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetAdResponse>(searchUrl);
  }



  /**
   * The is function gets a particular ad by Id
   * @param adId 
   */
  getAd(adId: number): Observable<Ad> {

    //build URL based on ad Id
    const adUrl = `${this.baseUrl}/${adId}`;

    return this.httpClient.get<Ad>(adUrl);
    
  }


  getAdCategories(): Observable<AdCategory[]> {

    return this.httpClient.get<GetAdCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.adCategory)
    );
  }

  SearchAds(theKeyword: string): Observable<Ad[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getAds(searchUrl);

  }


  private getAds(searchUrl: string): Observable<Ad[]> {
    return this.httpClient.get<GetAdResponse>(searchUrl).pipe(
      map(response => response._embedded.ads)
    );
  }
}


interface GetAdResponse {
  _embedded: {
    ads: Ad[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetAdCategoryResponse {
  _embedded: {
    adCategory: AdCategory[];
  }
}
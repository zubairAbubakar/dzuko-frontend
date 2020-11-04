import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class DzukoFormService {

  private countriesUrl =  'http://localhost:8082/api/countries'
  private statesUrl =  'http://localhost:8082/api/states'


  constructor(private httpClient: HttpClient) { }

  /**
   * Get list of countries
   */
  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetCountriesResponse>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  /**
   * 
   * @param countryCode 
   */
  getStates(countryCode: string): Observable<State[]> {

    //search state Url
    const stateSearchUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetStatesResponse>(stateSearchUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  /**
   * 
   * @param startMonth 
   */
  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    //build an array of "Month" dropdown list
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){

      data.push(theMonth);
    }

    return of(data);

  }


  /**
   * 
   * @param startYear
   */
  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    //build an array of "Year" dropdown list
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){

      data.push(theYear);
    }

    return of(data);

  }

}


interface GetCountriesResponse {

  _embedded: {
    countries: Country[];
  }
}


interface GetStatesResponse {

  _embedded: {
    states: State[];
  }
}
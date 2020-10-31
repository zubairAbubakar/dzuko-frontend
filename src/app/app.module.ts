import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AdService } from './services/ad.service';
import { Routes, RouterModule } from '@angular/router';
import { AdCategoryMenuComponent } from './components/ad-category-menu/ad-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';


const routes: Routes = [
  {path: 'ads/:id', component: AdDetailsComponent},
  {path: 'search/:keyword', component: AdListComponent},
  {path: 'category/:id/:name', component: AdListComponent},
  {path: 'category', component: AdListComponent},
  {path: 'ads', component: AdListComponent},
  {path: '', redirectTo: '/ads', pathMatch: 'full'},
  {path: '**', redirectTo: '/ads', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AdListComponent,
    AdCategoryMenuComponent,
    SearchComponent,
    AdDetailsComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    RouterModule
  ],
  providers: [AdService],
  bootstrap: [AppComponent]
})
export class AppModule { }

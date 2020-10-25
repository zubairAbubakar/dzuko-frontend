import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryMenuComponent } from './ad-category-menu.component';

describe('AdCategoryMenuComponent', () => {
  let component: AdCategoryMenuComponent;
  let fixture: ComponentFixture<AdCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

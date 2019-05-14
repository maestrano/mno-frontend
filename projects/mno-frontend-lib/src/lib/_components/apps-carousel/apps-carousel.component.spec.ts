import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCarouselComponent } from './apps-carousel.component';

describe('AppsCarouselComponent', () => {
  let component: AppsCarouselComponent;
  let fixture: ComponentFixture<AppsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

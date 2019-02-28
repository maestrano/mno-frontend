import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnoFrontendLibComponent } from './mno-frontend-lib.component';

describe('MnoFrontendLibComponent', () => {
  let component: MnoFrontendLibComponent;
  let fixture: ComponentFixture<MnoFrontendLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnoFrontendLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnoFrontendLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

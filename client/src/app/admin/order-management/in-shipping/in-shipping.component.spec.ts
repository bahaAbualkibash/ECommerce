import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InShippingComponent } from './in-shipping.component';

describe('InShippingComponent', () => {
  let component: InShippingComponent;
  let fixture: ComponentFixture<InShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupPaymentPage } from './topup-payment.page';

describe('TopupPaymentPage', () => {
  let component: TopupPaymentPage;
  let fixture: ComponentFixture<TopupPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

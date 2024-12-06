import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderdetailPage } from './orderdetail.page';

describe('OrderdetailPage', () => {
  let component: OrderdetailPage;
  let fixture: ComponentFixture<OrderdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

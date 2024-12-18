import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoriPage } from './order-histori.page';

describe('OrderHistoriPage', () => {
  let component: OrderHistoriPage;
  let fixture: ComponentFixture<OrderHistoriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

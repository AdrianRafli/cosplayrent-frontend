import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelesaikanTransaksiOrderPage } from './selesaikan-transaksi-order.page';

describe('SelesaikanTransaksiOrderPage', () => {
  let component: SelesaikanTransaksiOrderPage;
  let fixture: ComponentFixture<SelesaikanTransaksiOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelesaikanTransaksiOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

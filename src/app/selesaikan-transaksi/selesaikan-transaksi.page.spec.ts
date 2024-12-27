import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelesaikanTransaksiPage } from './selesaikan-transaksi.page';

describe('SelesaikanTransaksiPage', () => {
  let component: SelesaikanTransaksiPage;
  let fixture: ComponentFixture<SelesaikanTransaksiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelesaikanTransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

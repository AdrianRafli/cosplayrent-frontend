import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PembayaranStatusPage } from './pembayaran-status.page';

describe('PembayaranStatusPage', () => {
  let component: PembayaranStatusPage;
  let fixture: ComponentFixture<PembayaranStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PembayaranStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

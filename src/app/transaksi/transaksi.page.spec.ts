import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransaksiPage } from './transaksi.page';

describe('TransaksiPage', () => {
  let component: TransaksiPage;
  let fixture: ComponentFixture<TransaksiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

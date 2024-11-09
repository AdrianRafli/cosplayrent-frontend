import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokoProductTambahPage } from './toko-product-tambah.page';

describe('TokoProductTambahPage', () => {
  let component: TokoProductTambahPage;
  let fixture: ComponentFixture<TokoProductTambahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TokoProductTambahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokoProdukPage } from './toko-produk.page';

describe('TokoProdukPage', () => {
  let component: TokoProdukPage;
  let fixture: ComponentFixture<TokoProdukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TokoProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

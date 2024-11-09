import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokoProductEditPage } from './toko-product-edit.page';

describe('TokoProductEditPage', () => {
  let component: TokoProductEditPage;
  let fixture: ComponentFixture<TokoProductEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TokoProductEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

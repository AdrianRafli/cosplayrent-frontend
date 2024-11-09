import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UbahSandiPage } from './ubah-sandi.page';

describe('UbahSandiPage', () => {
  let component: UbahSandiPage;
  let fixture: ComponentFixture<UbahSandiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UbahSandiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

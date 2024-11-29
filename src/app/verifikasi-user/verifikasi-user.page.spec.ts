import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifikasiUserPage } from './verifikasi-user.page';

describe('VerifikasiUserPage', () => {
  let component: VerifikasiUserPage;
  let fixture: ComponentFixture<VerifikasiUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifikasiUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

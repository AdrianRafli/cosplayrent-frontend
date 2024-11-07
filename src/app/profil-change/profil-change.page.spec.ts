import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilChangePage } from './profil-change.page';

describe('ProfilChangePage', () => {
  let component: ProfilChangePage;
  let fixture: ComponentFixture<ProfilChangePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

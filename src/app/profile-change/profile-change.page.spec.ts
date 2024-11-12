import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileChangePage } from './profile-change.page';

describe('ProfilChangePage', () => {
  let component: ProfileChangePage;
  let fixture: ComponentFixture<ProfileChangePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

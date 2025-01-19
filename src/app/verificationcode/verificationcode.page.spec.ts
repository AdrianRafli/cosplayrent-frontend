import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationcodePage } from './verificationcode.page';

describe('VerificationcodePage', () => {
  let component: VerificationcodePage;
  let fixture: ComponentFixture<VerificationcodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BelajarssePage } from './belajarsse.page';

describe('BelajarssePage', () => {
  let component: BelajarssePage;
  let fixture: ComponentFixture<BelajarssePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BelajarssePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

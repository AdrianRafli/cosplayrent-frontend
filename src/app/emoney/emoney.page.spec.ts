import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmoneyPage } from './emoney.page';

describe('EmoneyPage', () => {
  let component: EmoneyPage;
  let fixture: ComponentFixture<EmoneyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
